import React, {useMemo, useRef, useState} from 'react';
import JoditEditor from "jodit-react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import NewsAPI from "../../api/news/NewsAPI";
import {useHistory}  from "react-router-dom";
const Toolbar = () => {
    const [value, setValue] = useState('');
    let ref = useRef(null);
    const history = useHistory();
    const config = {
        "askBeforePasteHTML": false,
        "askBeforePasteFromHTML": false,
        "askBeforePasteFromWord": false,
        "defaultActionOnPaste": "insert_clear_html",
        hotkeys: {
            redo: 'ctrl+z',
            undo: 'ctrl+y,ctrl+shift+z',
            indent: 'ctrl+]',
            outdent: 'ctrl+[',
            bold: 'ctrl+b',
            italic: 'ctrl+i',
            removeFormat: 'ctrl+shift+m',
            insertOrderedList: 'ctrl+shift+7',
            insertUnorderedList: 'ctrl+shift+8',
            openSearchDialog: 'ctrl+f',
            openReplaceDialog: 'ctrl+r',
        },
    };

    const saveNews = async () => {
        let data = await NewsAPI.createNews(value)
        if (data.data.success) {
            history.push('/news')
        }
    };
    return (
        <div>
            {useMemo(() => (
                <JoditEditor
                    ref={ref}
                    value={value}
                    config={config}
                    tabIndex={1} // tabIndex of textarea/ preferred to use only tion to update the content for performance reasons
                    onChange={temp => setValue(temp)}
                />
                // eslint-disable-next-line react-hooks/exhaustive-deps
            ), [])}
            <Box className="modalButtonGroup">
                <>
                    <Button variant="outlined" color="primary"
                    >Отмена</Button>
                    <Button onClick={saveNews} variant="contained" color="primary"
                            disableElevation
                    >Сохранить</Button>
                </>
            </Box>
        </div>
    );
};

export default Toolbar;
