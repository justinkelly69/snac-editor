import React, { Component } from 'react'
import {
    SNAC,
    XMLDisplay, NodeEditor, TextEditor, CDATAEditor,
    CommentEditor, PIEditor, Editors, Display,
} from '.'
//import * as SNAC from 'snac'

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: SNAC.xml2snac(this.props.xml),
            root: SNAC.xml2snac(this.props.xml),
            editor: "",
            prevEditor: "",
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
        this.newDocument = this.newDocument.bind(this)
    }

    setEditor(props) {
        const prevEditor = this.state.editor
        props.data ? (
            this.isEditor(props.editor) ? (
                this.clearEditor(this.clearSelected(() => {
                    this.setState({
                        data: SNAC.clone(props.data),
                        editor: props.editor,
                        prevEditor: prevEditor,
                        path: props.path,
                    })
                }))) :
                this.isDisplay(props.editor) && props.selectedNodes.length === 0 ?
                    this.clearEditor() :
                    this.setState({
                        root: props.root,
                        editor: Editors.XML_DISPLAY,
                        path: props.path,
                        prefix: props.prefix,
                        selectedPaths: props.selectedPaths,
                        selectedNodes: props.selectedNodes,
                    })) :
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

    newNode(newNS, newName) {
        const newNode = SNAC.newElement(newNS, newName)
        newNode.C = SNAC.newText()
        return newNode
    }

    newDocument(newNS = 'ns', newName = 'name') {
        this.clearEditor(() => this.newNode(newNS, newName))
    }

    clearEditor(next) {
        this.setState({
            //data: {},
            editor: '',
            prefix: '',
            path: '',
            selectedPaths: [],
            selectedNodes: []
        }, () => {
            next && next()
        })
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

    setSelectMode1() {
        if (!this.state.selectMode) {
            this.setState({
                editor: Editors.XML_DISPLAY,
                //selectMode: !this.state.selectMode
            })
        }
        this.setState({ selectMode: !this.state.selectMode })
    }

    setSelectMode(selectMode) {
        if (selectMode === true) {
            this.setState({
                editor: Editors.XML_DISPLAY,
                isSelectable: true,
                selectMode: true
            })
        }
        else {
            this.setState({
                editor: this.state.prevEditor,
                selectMode: false,
            }, () => this.clearSelected(f => f))
            //
        }
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
        return this.state.editor === Editors.NODE_EDITOR ? (
            <NodeEditor
                root={this.state.root}
                data={this.state.data}
                path={this.state.path}
                pathRow={this.state.pathRow}
                isEdited={this.state.isEdited}
                twoLines={this.state.twoLines}
                closingTags={this.state.closingTags}
                selectMode={this.state.selectMode}
                isSelectable={this.state.isSelectable}
                editor={this.state.editor}
                writeable={true}

                saveNode={this.saveNode}
                unwrapNode={this.unwrapNode}
                setEdited={this.setEdited}
                setTwoLines={this.setTwoLines}
                showClosingTags={this.showClosingTags}
                setSelectMode={this.setSelectMode}
                setSelectable={this.setSelectable}
                setEditor={this.setEditor}
                clearEditor={this.clearEditor}
                setSelected={this.setSelected}
                setPath={this.setPath}
            />
        ) : this.state.editor === Editors.TEXT_EDITOR ? (
            <TextEditor
                root={this.state.root}
                data={this.state.data}
                path={this.state.path}
                pathRow={this.state.pathRow}
                isEdited={this.state.isEdited}
                twoLines={this.state.twoLines}
                closingTags={this.state.closingTags}
                selectMode={this.state.selectMode}
                isSelectable={this.state.isSelectable}
                editor={this.state.editor}
                writeable={true}

                pasteEnable={this.pasteEnable}
                pasteNodes={this.pasteNodes}
                insertNode={this.insertNode}
                insertComment={this.insertComment}
                insertCDATA={this.insertCDATA}
                insertPI={this.insertPI}
                saveText={this.saveText}
                setEdited={this.setEdited}
                setTwoLines={this.setTwoLines}
                showClosingTags={this.showClosingTags}
                setSelectMode={this.setSelectMode}
                setSelectable={this.setSelectable}
                setEditor={this.setEditor}
                clearEditor={this.clearEditor}
                setSelected={this.setSelected}
                setPath={this.setPath}
            />
        ) : this.state.editor === Editors.CDATA_EDITOR ? (
            <CDATAEditor
                root={this.state.root}
                data={this.state.data}
                path={this.state.path}
                pathRow={this.state.pathRow}
                isEdited={this.state.isEdited}
                twoLines={this.state.twoLines}
                closingTags={this.state.closingTags}
                selectMode={this.state.selectMode}
                isSelectable={this.state.isSelectable}
                editor={this.state.editor}
                writeable={true}

                saveCDATA={this.saveCDATA}
                unwrapNode={this.unwrapNode}
                setEdited={this.setEdited}
                setTwoLines={this.setTwoLines}
                showClosingTags={this.showClosingTags}
                setSelectMode={this.setSelectMode}
                setSelectable={this.setSelectable}
                setEditor={this.setEditor}
                clearEditor={this.clearEditor}
                setSelected={this.setSelected}
                setPath={this.setPath}
            />
        ) : this.state.editor === Editors.COMMENT_EDITOR ? (
            <CommentEditor
                root={this.state.root}
                data={this.state.data}
                path={this.state.path}
                pathRow={this.state.pathRow}
                isEdited={this.state.isEdited}
                twoLines={this.state.twoLines}
                closingTags={this.state.closingTags}
                selectMode={this.state.selectMode}
                isSelectable={this.state.isSelectable}
                editor={this.state.editor}
                writeable={true}

                saveComment={this.saveComment}
                unwrapNode={this.unwrapNode}
                setEdited={this.setEdited}
                setTwoLines={this.setTwoLines}
                showClosingTags={this.showClosingTags}
                setSelectMode={this.setSelectMode}
                setSelectable={this.setSelectable}
                setEditor={this.setEditor}
                clearEditor={this.clearEditor}
                setSelected={this.setSelected}
                setPath={this.setPath}
            />
        ) : this.state.editor === Editors.PI_EDITOR ? (
            <PIEditor
                root={this.state.root}
                data={this.state.data}
                path={this.state.path}
                pathRow={this.state.pathRow}
                isEdited={this.state.isEdited}
                twoLines={this.state.twoLines}
                closingTags={this.state.closingTags}
                selectMode={this.state.selectMode}
                isSelectable={this.state.isSelectable}
                editor={this.state.editor}
                writeable={true}

                savePI={this.savePI}
                unwrapNode={this.unwrapNode}
                setEdited={this.setEdited}
                setTwoLines={this.setTwoLines}
                showClosingTags={this.showClosingTags}
                setSelectMode={this.setSelectMode}
                setSelectable={this.setSelectable}
                setEditor={this.setEditor}
                clearEditor={this.clearEditor}
                setSelected={this.setSelected}
                setPath={this.setPath}
            />
        ) : this.state.editor === Editors.XML_DISPLAY ? (
            <XMLDisplay
                root={this.state.root}
                data={this.state.data}
                path={this.state.path}
                pathRow={this.state.pathRow}
                prefix={this.state.prefix}
                selectedPaths={this.state.selectedPaths}
                selectedNodes={this.state.selectedNodes}
                isEdited={this.state.isEdited}
                twoLines={this.state.twoLines}
                closingTags={this.state.closingTags}
                selectMode={this.state.selectMode}
                isSelectable={this.state.isSelectable}
                editor={this.state.editor}
                writeable={true}

                cutNodes={this.cutNodes}
                copyNodes={this.copyNodes}
                deleteNodes={this.deleteNodes}
                wrapNodes={this.wrapNodes}
                clearSelected={this.clearSelected}
                setEdited={this.setEdited}
                setTwoLines={this.setTwoLines}
                showClosingTags={this.showClosingTags}
                setSelectMode={this.setSelectMode}
                setSelectable={this.setSelectable}
                setEditor={this.setEditor}
                clearEditor={this.clearEditor}
                setSelected={this.setSelected}
                setPath={this.setPath}
            />
        ) : (
            <Display
                root={this.state.root}
                data={this.state.root}
                path={this.state.path}
                closingTags={this.state.closingTags}
                twoLines={this.state.twoLines}
                selectMode={this.state.selectMode}
                pathRow={this.state.pathRow}
                isSelectable={this.state.isSelectable}
                editor={this.state.editor}
                selectedNodes={this.state.selectedNodes}

                setTwoLines={this.setTwoLines}
                showClosingTags={this.showClosingTags}
                setSelectMode={this.setSelectMode}
                cutNodes={this.cutNodes}
                copyNodes={this.copyNodes}
                deleteNodes={this.deleteNodes}
                wrapNodes={this.wrapNodes}
                clearSelected={this.clearSelected}
                setEdited={this.setEdited}
                writeable={false}
                setSelectable={this.setSelectable}
                setEditor={this.setEditor}
                clearEditor={this.clearEditor}
                setSelected={this.setSelected}
                setPath={this.setPath}
            />
        )
    }
}

export default Main