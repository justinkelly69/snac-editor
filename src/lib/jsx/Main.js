import React, { Component } from 'react'
import {
    XMLDisplay, NodeEditor, TextEditor, CDATAEditor,
    CommentEditor, PIEditor, Editors, Display,
} from '.'
import * as SNAC from 'snac'

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: SNAC.xml2snac(this.props.xml),
            root: SNAC.xml2snac(this.props.xml),
            editor: "",
            isEdited: false,
            path: [],
            pathDisplay: [],
            pathRow: [],
            prefix: [],
            selectedPaths: [],
            selectedNodes: [],
            clipboard: [],
            twoLines: false,
            closingTags: false,
            selectMode: false,
            isSelectable: true,
        }
        this.setEditor = this.setEditor.bind(this)
        this.clearEditor = this.clearEditor.bind(this)
        this.setEdited = this.setEdited.bind(this)
        this.setPath = this.setPath.bind(this)
        this.saveNode = this.saveNode.bind(this)
        this.unwrapNode = this.unwrapNode.bind(this)
        this.wrapNodes = this.wrapNodes.bind(this)
        this.cutNodes = this.cutNodes.bind(this)
        this.copyNodes = this.copyNodes.bind(this)
        this.deleteNodes = this.deleteNodes.bind(this)
        this.pasteEnable = this.pasteEnable.bind(this)
        this.pasteNodes = this.pasteNodes.bind(this)
        this.insertNode = this.insertNode.bind(this)
        this.saveText = this.saveText.bind(this)
        this.insertComment = this.insertComment.bind(this)
        this.saveComment = this.saveComment.bind(this)
        this.insertCDATA = this.insertCDATA.bind(this)
        this.saveCDATA = this.saveCDATA.bind(this)
        this.insertPI = this.insertPI.bind(this)
        this.savePI = this.savePI.bind(this)
        this.setSelected = this.setSelected.bind(this)
        this.clearSelected = this.clearSelected.bind(this)
        this.setTwoLines = this.setTwoLines.bind(this)
        this.showClosingTags = this.showClosingTags.bind(this)
        this.setSelectMode = this.setSelectMode.bind(this)
        this.setSelectable = this.setSelectable.bind(this)
    }

    setEditor(props) {
        props.data ? (
            this.isEditor(props.editor) ? (
                this.clearEditor(this.clearSelected(() => {
                    this.setState({
                        data: SNAC.clone(props.data),
                        editor: props.editor,
                        path: props.path,
                    })
                }))) :
                this.isDisplay(props.editor) && props.selectedNodes.length === 0 ?
                    this.clearEditor() :
                    this.setState(() => ({
                        root: props.root,
                        editor: Editors.XML_DISPLAY,
                        path: props.path,
                        prefix: props.prefix,
                        selectedPaths: props.selectedPaths,
                        selectedNodes: props.selectedNodes,
                    }))) :
            this.clearEditor()
    }

    isEditor(e) {
        return (
            e === Editors.NODE_EDITOR ||
            e === Editors.TEXT_EDITOR ||
            e === Editors.CDATA_EDITOR ||
            e === Editors.COMMENT_EDITOR ||
            e === Editors.PI_EDITOR
        )
    }

    isDisplay(e) {
        return e === Editors.XML_DISPLAY
    }

    clearEditor(next) {
        this.setState({
            data: {},
            editor: '',
            prefix: '',
            path: '',
            selectedPaths: [],
            selectedNodes: []
        }, next && next())
    }

    setEdited(isEdited) {
        this.setState({ isEdited: isEdited })
    }

    setTwoLines() {
        this.setState({ twoLines: !this.state.twoLines })
    }

    showClosingTags() {
        this.setState({ closingTags: !this.state.closingTags })
    }

    setSelectMode() {
        if (!this.state.selectMode) {
            this.setState({ 
                editor: Editors.XML_DISPLAY,
                //selectMode: !this.state.selectMode
             })
        }
        this.setState({ selectMode: !this.state.selectMode })
    }

    setSelectable(isSelectable) {
        this.setState({ isSelectable: isSelectable })
    }


    setPath(pathDisplay, atts = null) {
        this.setState({ pathDisplay: pathDisplay }, () => {
            atts === null ?
                this.setState({
                    pathRow: SNAC.find(this.state.root, this.state.pathDisplay)
                }) :
                this.setState({
                    pathRow: [...SNAC.find(this.state.root, this.state.pathDisplay), atts]
                })
        })
    }

    saveNode(data, newNS, newName, atts) {
        const { remove, replace } = SNAC.saveNode(data, newNS, newName, atts)
        this.save(remove, replace)
    }

    cutNodes() {
        const { clipboard, remove, replace, selectedNodes, selectedPaths } =
            SNAC.cutNodes(this.state.root, this.state.selectedPaths, this.state.selectedNodes)
        this.save(remove, replace)
        this.setState({ clipboard, selectedNodes, selectedPaths })
    }

    copyNodes() {
        const { clipboard, selectedNodes, selectedPaths } =
            SNAC.copyNodes(this.state.selectedNodes)
        this.setState({ clipboard, selectedNodes, selectedPaths })
    }

    deleteNodes() {
        const { clipboard, remove, replace, selectedNodes, selectedPaths } =
            SNAC.deleteNodes(this.state.root, this.state.selectedPaths)
        this.save(remove, replace)
        this.setState({ clipboard, selectedNodes, selectedPaths })
    }

    pasteNodes(data, atts) {
        const { remove, replace } =
            SNAC.pasteNodes(this.state.root, data, atts, this.state.clipboard)
        this.save(remove, replace)
    }

    pasteEnable() {
        return this.state.clipboard && this.state.clipboard.length > 0
    }

    wrapNodes(newNS, newName) {
        const { remove, replace, selectedPaths, selectedNodes, path } =
            SNAC.wrapNodes(
                newNS,
                newName,
                this.state.root,
                this.state.selectedPaths,
                this.state.selectedNodes
            )
        this.save(remove, replace)
        this.setEditor({
            root: this.state.root,
            editor: Editors.XML_DISPLAY,
            path,
            selectedPaths,
            selectedNodes
        })
    }

    unwrapNode(root, path) {
        const { remove, replace } = SNAC.unwrapNode(root, path)
        this.save(remove, replace)
    }

    // TEXT EDITOR METHODS
    insertNode(data, atts) {
        const { remove, replace } = SNAC.insertNode(data, atts)
        this.save(remove, replace)
        this.setEditor({
            editor: Editors.TEXT_EDITOR,
            root: this.state.root
        })
    }

    saveText(data, text) {
        const { remove, replace } = SNAC.updateText(data, text)
        this.save(remove, replace)
    }

    // COMMENT EDITOR METHODS
    insertComment(data, atts) {
        const { remove, replace } = SNAC.insertComment(data, atts)
        this.save(remove, replace)
        this.setEditor({
            editor: Editors.COMMENT_EDITOR,
            root: this.state.root
        })
    }

    saveComment(data, comment) {
        const { remove, replace } = SNAC.updateComment(data, comment)
        this.save(remove, replace)
    }

    // CDATA EDITOR METHODS
    insertCDATA(data, atts) {
        const { remove, replace } = SNAC.insertCDATA(data, atts)
        this.save(remove, replace)
        this.setEditor({
            editor: Editors.CDATA_EDITOR,
            root: this.state.root
        })
    }

    saveCDATA(data, cdata) {
        const { remove, replace } = SNAC.updateCDATA(data, cdata)
        this.save(remove, replace)
    }

    // PI EDITOR METHODS
    insertPI(data, atts) {
        const { remove, replace } = SNAC.insertPI(data, atts)
        this.save(remove, replace)
        this.setEditor({
            editor: Editors.PI_EDITOR,
            root: this.state.root
        })
    }

    savePI(data, lang, body) {
        if (SNAC.piLangTest(lang)) {
            const { remove, replace } = SNAC.updatePI(data, lang, body)
            this.save(remove, replace)
        }
    }

    // XML EDITOR FUNCTIONS
    setSelected(path, next) {
        const { root, selectedPaths, selectedNodes } = SNAC.setSelected(this.state.root, this.state.selectedPaths, path)
        this.setState({
            root: root,
            selectedPaths,
            selectedNodes
        }, () => next(root, selectedPaths, selectedNodes))
    }

    clearSelected(next) {
        const { root, selectedPaths, selectedNodes } = SNAC.clearSelected(this.state.root)
        this.setState({
            root: root,
            selectedPaths,
            selectedNodes
        }, () => next())
    }

    // SAVE EVERYTHING
    save(remove, replace) {
        if (this.state.data._ !== null) {
            this.setState({
                root: SNAC.clone(this.state.root, { remove, replace })
            })
        }
    }

    render() {

        const docProps = {
            data: this.state.root,
            setEditor: this.setEditor,
            clearEditor: this.clearEditor,
            setSelected: this.setSelected,
            writeable: this.state.writeable,
            setPath: this.setPath,
            editor: this.state.editor,
        }

        return this.state.editor === Editors.NODE_EDITOR ? (
            <NodeEditor
                data={this.state.data}
                root={this.state.root}
                path={this.state.path}
                pathRow={this.state.pathRow}
                saveNode={this.saveNode}
                unwrapNode={this.unwrapNode}
                setEdited={this.setEdited}
                isEdited={this.state.isEdited}
                setTwoLines={this.setTwoLines}
                twoLines={this.state.twoLines}
                showClosingTags={this.showClosingTags}
                closingTags={this.state.closingTags}
                selectMode={this.state.selectMode}
                setSelectMode={this.setSelectMode}
                docProps={docProps}
                setSelectable={this.setSelectable}
                isSelectable={this.state.isSelectable}
                setEditor={this.setEditor}
                clearEditor={this.clearEditor}
                setSelected={this.setSelected}
                setPath={this.setPath}
                editor={this.state.editor}
                writeable={true}
            />
        ) : this.state.editor === Editors.TEXT_EDITOR ? (
            <TextEditor
                data={this.state.data}
                root={this.state.root}
                path={this.state.path}
                pathRow={this.state.pathRow}
                pasteEnable={this.pasteEnable}
                pasteNodes={this.pasteNodes}
                insertNode={this.insertNode}
                insertComment={this.insertComment}
                insertCDATA={this.insertCDATA}
                insertPI={this.insertPI}
                saveText={this.saveText}
                setEdited={this.setEdited}
                isEdited={this.state.isEdited}
                setTwoLines={this.setTwoLines}
                twoLines={this.state.twoLines}
                showClosingTags={this.showClosingTags}
                closingTags={this.state.closingTags}
                selectMode={this.state.selectMode}
                setSelectMode={this.setSelectMode}
                docProps={docProps}

                setSelectable={this.setSelectable}
                isSelectable={this.state.isSelectable}
                setEditor={this.setEditor}
                clearEditor={this.clearEditor}
                setSelected={this.setSelected}
                setPath={this.setPath}
                editor={this.state.editor}
                writeable={true}
            />
        ) : this.state.editor === Editors.CDATA_EDITOR ? (
            <CDATAEditor
                data={this.state.data}
                root={this.state.root}
                path={this.state.path}
                pathRow={this.state.pathRow}
                saveCDATA={this.saveCDATA}
                unwrapNode={this.unwrapNode}
                setEdited={this.setEdited}
                isEdited={this.state.isEdited}
                setTwoLines={this.setTwoLines}
                twoLines={this.state.twoLines}
                showClosingTags={this.showClosingTags}
                closingTags={this.state.closingTags}
                selectMode={this.state.selectMode}
                setSelectMode={this.setSelectMode}
                docProps={docProps}
                setSelectable={this.setSelectable}
                isSelectable={this.state.isSelectable}
                setEditor={this.setEditor}
                clearEditor={this.clearEditor}
                setSelected={this.setSelected}
                setPath={this.setPath}
                editor={this.state.editor}
                writeable={true}
            />
        ) : this.state.editor === Editors.COMMENT_EDITOR ? (
            <CommentEditor
                data={this.state.data}
                root={this.state.root}
                path={this.state.path}
                pathRow={this.state.pathRow}
                saveComment={this.saveComment}
                unwrapNode={this.unwrapNode}
                setEdited={this.setEdited}
                isEdited={this.state.isEdited}
                setTwoLines={this.setTwoLines}
                twoLines={this.state.twoLines}
                showClosingTags={this.showClosingTags}
                closingTags={this.state.closingTags}
                selectMode={this.state.selectMode}
                setSelectMode={this.setSelectMode}
                docProps={docProps}

                setSelectable={this.setSelectable}
                isSelectable={this.state.isSelectable}
                setEditor={this.setEditor}
                clearEditor={this.clearEditor}
                setSelected={this.setSelected}
                setPath={this.setPath}
                editor={this.state.editor}
                writeable={true}
            />
        ) : this.state.editor === Editors.PI_EDITOR ? (
            <PIEditor
                data={this.state.data}
                root={this.state.root}
                path={this.state.path}
                pathRow={this.state.pathRow}
                savePI={this.savePI}
                unwrapNode={this.unwrapNode}
                setEdited={this.setEdited}
                isEdited={this.state.isEdited}
                setTwoLines={this.setTwoLines}
                twoLines={this.state.twoLines}
                showClosingTags={this.showClosingTags}
                closingTags={this.state.closingTags}
                setSelectMode={this.setSelectMode}
                selectMode={this.state.selectMode}
                docProps={docProps}

                setSelectable={this.setSelectable}
                isSelectable={this.state.isSelectable}
                setEditor={this.setEditor}
                clearEditor={this.clearEditor}
                setSelected={this.setSelected}
                setPath={this.setPath}
                editor={this.state.editor}
                writeable={true}
            />
        ) : this.state.editor === Editors.XML_DISPLAY ? (
            <XMLDisplay
                data={this.state.data}
                root={this.state.root}
                path={this.state.path}
                pathRow={this.state.pathRow}
                prefix={this.state.prefix}
                selectedPaths={this.state.selectedPaths}
                selectedNodes={this.state.selectedNodes}
                isEdited={this.state.isEdited}
                twoLines={this.state.twoLines}
                closingTags={this.state.closingTags}
                selectMode={this.state.selectMode}

                cutNodes={this.cutNodes}
                copyNodes={this.copyNodes}
                deleteNodes={this.deleteNodes}
                wrapNodes={this.wrapNodes}
                clearSelected={this.clearSelected}
                setEdited={this.setEdited}
                setTwoLines={this.setTwoLines}
                showClosingTags={this.showClosingTags}
                setSelectMode={this.setSelectMode}
                docProps={docProps}

                setSelectable={this.setSelectable}
                isSelectable={this.state.isSelectable}
                setEditor={this.setEditor}
                clearEditor={this.clearEditor}
                setSelected={this.setSelected}
                setPath={this.setPath}
                editor={this.state.editor}
                writeable={true}
            />




        ) : (
            <Display
                root={this.state.data}
                data={this.state.data}
                path={this.state.path}
                docProps={docProps}
                setTwoLines={this.setTwoLines}
                showClosingTags={this.showClosingTags}
                closingTags={this.state.closingTags}
                twoLines={this.state.twoLines}
                setSelectMode={this.setSelectMode}
                selectMode={this.state.selectMode}
                pathRow={this.state.pathRow}
                cutNodes={this.cutNodes}
                copyNodes={this.copyNodes}
                deleteNodes={this.deleteNodes}
                wrapNodes={this.wrapNodes}
                clearSelected={this.clearSelected}
                setEdited={this.setEdited}

                writeable={false}
                setSelectable={this.setSelectable}
                isSelectable={this.state.isSelectable}
                setEditor={this.setEditor}
                clearEditor={this.clearEditor}
                setSelected={this.setSelected}
                setPath={this.setPath}
                editor={this.state.editor}
                selectedNodes={this.state.selectedNodes}
            //page={this.props.page}
            />
        )
    }
}

export default Main