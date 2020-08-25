import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import { Input } from '@material-ui/core';

import KanjiFormContext from '../context/context';

const useStyles = makeStyles({
  container: {
    height: '15rem',
  },
  table: {
    minWidth: 'auto',
    overflow: 'auto',
  },
  tablecell: {
    fontSize: '1.5rem',
  },
});

const row = (
  entry,
  entryIdx,
  entryKey,
  handleEdit,
  startEdit,
  endEdit,
  editIdx,
  classes,
  getRef,
  handleRemove,
) => {
  const currentlyEditing = entryIdx === editIdx;

  return (
    <TableRow key={uuidv4()}>
      {currentlyEditing ? (
        <TableCell
          align="center"
          size="small"
          className={classes.tablecell}
        >
          <Input
            name={entry}
            onChange={
              (event) => handleEdit(event, entryIdx, entryKey)
              // eslint-disable-next-line react/jsx-curly-newline
            }
            value={entry}
            ref={getRef}
          />
        </TableCell>
      ) : (
        <TableCell
          align="center"
          size="small"
          className={classes.tablecell}
        >
          {entry}
        </TableCell>
      )}
      {currentlyEditing ? (
        <TableCell align="right" size="small">
          <IconButton edge="end" onClick={() => endEdit()}>
            <DoneIcon fontSize="large" />
          </IconButton>
        </TableCell>
      ) : (
        <TableCell align="right" size="small">
          <IconButton edge="end" onClick={() => startEdit(entryIdx)}>
            <EditIcon fontSize="large" />
          </IconButton>
        </TableCell>
      )}

      <TableCell align="right" size="small">
        <IconButton
          edge="end"
          onClick={() => handleRemove(entryKey, entryIdx)}
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ({ entries, entryKey }) => {
  const classes = useStyles();
  const [editIdx, setEditIdx] = useState(-1);
  const { dispatchKanjiFormAction } = useContext(KanjiFormContext);
  const getRef = (node) => {
    if (!node) return;
    node.firstElementChild.focus();
  };

  const handleEdit = (event, entryIdx, key) => {
    const { value } = event.target;
    dispatchKanjiFormAction({
      type: 'EDIT_ENTRY',
      value,
      key,
      entryIdx,
    });
  };

  const handleRemove = (key, entryIdx) => {
    dispatchKanjiFormAction({
      type: 'REMOVE_ENTRY',
      key,
      entryIdx,
    });
  };

  const startEdit = (entryIdx) => setEditIdx(entryIdx);

  const endEdit = () => setEditIdx(-1);

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table}>
        <TableBody>
          {entries.map((entry, entryIdx) =>
            row(
              entry,
              entryIdx,
              entryKey,
              handleEdit,
              startEdit,
              endEdit,
              editIdx,
              classes,
              getRef,
              handleRemove,
            ),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
