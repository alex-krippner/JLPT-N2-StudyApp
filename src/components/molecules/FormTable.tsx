import React, { useContext, useState } from 'react';

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

import CardFormContext from '../../context/context';

const useStyles = makeStyles({
  container: {
    height: '100%',
    boxShadow: 'none',
  },
  table: {
    minWidth: 'auto',
    overflow: 'auto',
  },
  tableCell: {
    fontSize: 'var(--font-size-small)',
  },
});

type FormTableProps = {
  entries: string[];
  entryKey: string;
};

const FormTable = ({ entries, entryKey }: FormTableProps) => {
  const classes = useStyles();
  const [editIdx, setEditIdx] = useState(-1);
  const { dispatchFormAction } = useContext(CardFormContext);

  const handleRemove = (key: string, entryIdx: number) => {
    dispatchFormAction({
      type: 'REMOVE_ENTRY',
      key,
      entryIdx,
    });
  };
  const startEdit = (entryIndex: number) => {
    setEditIdx(entryIndex);
  };
  const endEdit = () => {
    setEditIdx(-1);
  };

  const submitEdit = (key: string, entryIdx: number) => {
    const { value } = document.getElementById(
      'table-input',
    ) as HTMLInputElement;
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
              <TableRow key={entry + entryIdx}>
                <TableCell
                  align="center"
                  size="small"
                  className={classes.tableCell}
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

export default FormTable;
