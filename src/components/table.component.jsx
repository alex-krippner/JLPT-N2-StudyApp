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
import ClearIcon from '@material-ui/icons/Clear';
import { Input } from '@material-ui/core';

import { CardFormContext } from '../context/context';

const useStyles = makeStyles({
  container: (props) => ({
    height: props.entries.length === 0 ? '15rem' : '20%',
    boxShadow: 'none',
    border: 'solid 1px rgba(65,105,225, 0.5)',
  }),
  table: {
    minWidth: 'auto',
    overflow: 'auto',
  },
  tablecell: {
    fontSize: 'var(--font-size-small)',
  },
});

export default (props) => {
  const { entries, entryKey } = props;
  console.log(entries.length);

  const classes = useStyles(props);

  // LOCAL STATE
  const [editIdx, setEditIdx] = useState(-1);

  // CARD FORM REDUCER
  const { dispatchFormAction } = useContext(CardFormContext);

  // remove entry input from table
  const handleRemove = (key, entryIdx) => {
    dispatchFormAction({
      type: 'REMOVE_ENTRY',
      key,
      entryIdx,
    });
  };

  // initiate edit for targeted entry input / table row
  // by setting the editIdx to the entry's array index

  const startEdit = (entryIndex) => {
    setEditIdx(entryIndex);
  };

  // reset editIdx when finished editing entry input / table row
  const endEdit = () => {
    setEditIdx(-1);
  };

  // submit/dispatch edited entry input / table row to card form reducer

  const submitEdit = (key, entryIdx) => {
    const { value } = document.getElementById('table-input');
    dispatchFormAction({
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
                    <Input id="table-input" fullWidth />
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
                    <IconButton
                      edge="end"
                      onClick={() => {
                        endEdit();
                      }}
                    >
                      <ClearIcon fontSize="large" />
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
