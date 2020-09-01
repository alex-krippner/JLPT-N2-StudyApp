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

import { CardFormContext } from '../context/context';

const useStyles = makeStyles({
  container: {
    height: '15rem',
    boxShadow: 'none',
    border: 'solid 1px rgba(65,105,225, 0.5)',
  },
  table: {
    minWidth: 'auto',
    overflow: 'auto',
  },
  tablecell: {
    fontSize: '1.5rem',
  },
});

export default ({ entries, entryKey }) => {
  const classes = useStyles();

  // CARD FORM STATE
  const { formDispatcher } = useContext(CardFormContext);

  // LOCAL STATE
  const [editIdx, setEditIdx] = useState(-1);

  const handleRemove = (key, entryIdx) => {
    formDispatcher({
      type: 'REMOVE_ENTRY',
      key,
      entryIdx,
    });
  };

  const startEdit = (entryIndex) => {
    setEditIdx(entryIndex);
  };
  const endEdit = () => {
    setEditIdx(-1);
  };

  const submitEdit = (key, entryIdx) => {
    const { value } = document.getElementById('table-input');
    formDispatcher({
      type: 'EDIT_ENTRY',
      value,
      key,
      entryIdx,
    });
  };
  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table}>
        <TableBody>
          {entries.map((entry, entryIdx) => {
            const currentlyEditing = entryIdx === editIdx;
            return (
              <TableRow key={uuidv4()}>
                <TableCell
                  align="center"
                  size="small"
                  className={classes.tablecell}
                >
                  {currentlyEditing ? (
                    <Input id="table-input" />
                  ) : (
                    entry
                  )}
                </TableCell>
                {currentlyEditing ? (
                  <TableCell align="right" size="small">
                    <IconButton
                      edge="end"
                      onClick={() => {
                        submitEdit(entryKey, entryIdx);
                        endEdit();
                      }}
                    >
                      <DoneIcon fontSize="large" />
                    </IconButton>
                  </TableCell>
                ) : (
                  <TableCell align="right" size="small">
                    <IconButton
                      edge="end"
                      onClick={() => startEdit(entryIdx)}
                    >
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
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
