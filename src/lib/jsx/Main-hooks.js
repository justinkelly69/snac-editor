import React, { useState } from "react";
import {
  XMLDisplay,
  NodeEditor,
  TextEditor,
  CDATAEditor,
  CommentEditor,
  PIEditor,
  Editors,
  Display,
} from ".";
import allXml from "../../data/allxml";
import * as SNAC from "snac";

const Main = (props) => {
  const [root, _setRoot] = useState(SNAC.xml2snac(props.xml));
  const [data, _setData] = useState(SNAC.xml2snac(props.xml));
  const [editor, _setEditor] = useState("");
  const [edited, _setEdited] = useState(false);
  const [path, _setPath] = useState([]);
  const [pathDisplay, _setPathDisplay] = useState([]);
  const [pathRow, _setPathRow] = useState([]);
  const [prefix, _setPrefix] = useState([]);
  const [selectedPaths, _setSelectedPaths] = useState([]);
  const [selectedNodes, _setSelectedNodes] = useState([]);
  const [clipboard, _setClipboard] = useState([]);
  const [writeable, _setWriteable] = useState(true);
  const [page, _setPage] = useState("waffle");

  const setEditor = (props) => 
    data && props.data && props.data._ === data._
      ? clearEditor()
      : props.data
        ? isEditor(props.editor)
          ? clearSelected(() => {
            _setData(SNAC.clone(props.data));
            _setEditor(props.editor);
            _setPath(props.path);
          })
          : isDisplay(props.editor) && props.selectedNodes.length === 0
            ? clearEditor()
            : (_setRoot(props.root),
              _setEditor(Editors.XML_DISPLAY),
              _setPath(props.path),
              _setPrefix(props.prefix),
              _setSelectedPaths(props.selectedPaths),
              _setSelectedNodes(props.selectedNodes))
        : clearEditor();
  

  const isEditor = (e) => {
    return (
      e === Editors.NODE_EDITOR ||
      e === Editors.TEXT_EDITOR ||
      e === Editors.CDATA_EDITOR ||
      e === Editors.COMMENT_EDITOR ||
      e === Editors.PI_EDITOR
    );
  };

  const isDisplay = (e) => {
    return e === Editors.XML_DISPLAY;
  };

  const clearEditor = () => {
    _setData({});
    _setEditor("Z");
    _setPrefix("");
    _setPath("");
    _setSelectedPaths([]);
    _setSelectedNodes([]);
  };

  const loadXML = (event) => {
    _setPage(event.target.value);
    _setEditor("Z");
    _setRoot(SNAC.xml2snac(allXml[this.state.page]));
  };

  const setWriteable = () => {
    clearSelected(() => {
      _setWriteable(!writeable);
      _setEditor("Z");
      _setData({});
    });
  };

  const setPath = (pathDisplay, atts = null) => {
    _setPathDisplay(pathDisplay);
    atts === null
      ? _setPathRow(SNAC.find(root, pathDisplay))
      : _setPathRow([...SNAC.find(root, pathDisplay), atts]);
  };

  const saveNode = (data, newNS, newName, atts) => {
    const { remove, replace } = SNAC.saveNode(data, newNS, newName, atts);
    save(remove, replace);
  };

  const cutNodes = () => {
    const { clipboard, remove, replace, selectedNodes, selectedPaths } =
      SNAC.cutNodes(root, selectedPaths, selectedNodes);
    save(remove, replace);
    _setClipboard(clipboard);
    _setSelectedNodes(selectedNodes);
    _setSelectedPaths(selectedPaths);
  };

  const copyNodes = () => {
    const { clipboard, selectedNodes, selectedPaths } =
      SNAC.copyNodes(selectedNodes);
    _setClipboard(clipboard);
    _setSelectedNodes(selectedNodes);
    _setSelectedPaths(selectedPaths);
  };

  const deleteNodes = () => {
    const { clipboard, remove, replace, selectedNodes, selectedPaths } =
      SNAC.deleteNodes(root, selectedPaths);
    save(remove, replace);
    _setClipboard(clipboard);
    _setSelectedNodes(selectedNodes);
    _setSelectedPaths(selectedPaths);
  };

  const pasteNodes = (data, atts) => {
    const { remove, replace } = SNAC.pasteNodes(root, data, atts, clipboard);
    this.save(remove, replace);
  };

  const pasteEnable = () => {
    return clipboard && clipboard.length > 0;
  };

  const wrapNodes = (newNS, newName) => {
    const { remove, replace, selectedPaths, selectedNodes, path } =
      SNAC.wrapNodes(newNS, newName, root, selectedPaths, selectedNodes);
    save(remove, replace);
    setEditor({
      editor: Editors.XML_DISPLAY,
      root,
      path,
      selectedPaths,
      selectedNodes,
    });
  };

  const unwrapNode = (root, path) => {
    const { remove, replace } = SNAC.unwrapNode(root, path);
    save(remove, replace);
  };

  // TEXT EDITOR METHODS
  const insertNode = (data, atts) => {
    const { remove, replace } = SNAC.insertNode(data, atts);
    save(remove, replace);
    setEditor({
      data: data,
      editor: Editors.TEXT_EDITOR,
    });
  };

  const saveText = (data, text) => {
    const { remove, replace } = SNAC.updateText(data, text);
    save(remove, replace);
  };

  // COMMENT EDITOR METHODS
  const insertComment = (data, atts) => {
    const { remove, replace } = SNAC.insertComment(data, atts);
    save(remove, replace);
    setEditor({
      editor: Editors.COMMENT_EDITOR,
      root: root,
    });
  };

  const saveComment = (data, comment) => {
    const { remove, replace } = SNAC.updateComment(data, comment);
    save(remove, replace);
  };

  // CDATA EDITOR METHODS
  const insertCDATA = (data, atts) => {
    const { remove, replace } = SNAC.insertCDATA(data, atts);
    save(remove, replace);
    setEditor({
      editor: Editors.CDATA_EDITOR,
      root: root,
    });
  };

  const saveCDATA = (data, cdata) => {
    const { remove, replace } = SNAC.updateCDATA(data, cdata);
    save(remove, replace);
  };

  // PI EDITOR METHODS
  const insertPI = (data, atts) => {
    const { remove, replace } = SNAC.insertPI(data, atts);
    save(remove, replace);
    setEditor({
      editor: Editors.PI_EDITOR,
      root: this.state.root,
    });
  };

  const savePI = (data, lang, body) => {
    if (SNAC.piLangTest(lang)) {
      const { remove, replace } = SNAC.updatePI(data, lang, body);
      save(remove, replace);
    }
  };

  // XML EDITOR FUNCTIONS
  const setSelected = (path, next) => {
    const { root, selectedPaths, selectedNodes } = SNAC.setSelected(
      root,
      selectedPaths,
      path
    );
    _setRoot(root);
    _setSelectedPaths(selectedPaths);
    _setSelectedNodes(selectedNodes);
    next(root, selectedPaths, selectedNodes);
  };

  const clearSelected = (next) => {
    const { root, selectedPaths, selectedNodes } = SNAC.clearSelected(
      this.state.root
    );
    _setRoot(root);
    _setSelectedPaths(selectedPaths);
    _setSelectedNodes(selectedNodes);
    next();
  };

  // SAVE EVERYTHING
  const save = (remove, replace) => {
    if (data._ !== null) {
      _setRoot(SNAC.clone(this.state.root, { remove, replace }));
    }
  };

  const docProps = () => {
    return {
      data: root,
      setEditor: setEditor,
      clearEditor: clearEditor,
      setSelected: setSelected,
      writeable: writeable,
      setPath: setPath,
      editor: editor,
      loadXML: loadXML,
      page: page,
    };
  };

  return editor === Editors.NODE_EDITOR ? (
    <NodeEditor
      data={data}
      root={root}
      path={path}
      pathRow={pathRow}
      saveNode={saveNode}
      unwrapNode={unwrapNode}
      clearEditor={clearEditor}
      docProps={docProps()}
    />
  ) : editor === Editors.TEXT_EDITOR ? (
    <TextEditor
      data={data}
      root={root}
      path={path}
      pathRow={pathRow}
      pasteEnable={pasteEnable}
      pasteNodes={pasteNodes}
      insertNode={insertNode}
      insertComment={insertComment}
      insertCDATA={insertCDATA}
      insertPI={insertPI}
      saveText={saveText}
      clearEditor={clearEditor}
      docProps={docProps()}
    />
  ) : editor === Editors.CDATA_EDITOR ? (
    <CDATAEditor
      data={data}
      root={root}
      path={path}
      pathRow={pathRow}
      saveCDATA={saveCDATA}
      unwrapNode={unwrapNode}
      clearEditor={clearEditor}
      docProps={docProps()}
    />
  ) : editor === Editors.COMMENT_EDITOR ? (
    <CommentEditor
      data={data}
      root={root}
      path={path}
      pathRow={pathRow}
      saveComment={saveComment}
      unwrapNode={unwrapNode}
      clearEditor={clearEditor}
      docProps={docProps()}
    />
  ) : editor === Editors.PI_EDITOR ? (
    <PIEditor
      data={data}
      root={root}
      path={path}
      pathRow={pathRow}
      savePI={savePI}
      unwrapNode={unwrapNode}
      clearEditor={clearEditor}
      docProps={docProps()}
    />
  ) : editor === Editors.XML_DISPLAY ? (
    <XMLDisplay
      data={data}
      root={root}
      path={path}
      pathRow={pathRow}
      prefix={prefix}
      selectedPaths={selectedPaths}
      selectedNodes={selectedNodes}
      cutNodes={cutNodes}
      copyNodes={copyNodes}
      deleteNodes={deleteNodes}
      wrapNodes={wrapNodes}
      setSelected={setSelected}
      clearSelected={clearSelected}
      setPath={setPath}
      setEditor={setEditor}
      clearEditor={clearEditor}
      docProps={docProps()}
    />
  ) : (
    <Display docProps={docProps()} {...props} />
  );
};

export default Main;
