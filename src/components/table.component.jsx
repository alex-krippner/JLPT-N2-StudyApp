import React from 'react';
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
        <IconButton edge="end">
          <DeleteIcon fontSize="large" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ({
  entries,
  entryKey,
  handleEdit,
  startEdit,
  endEdit,
  editIdx,
  getRef,
}) => {
  const classes = useStyles();
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
            ),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
