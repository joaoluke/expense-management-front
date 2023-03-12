import { useState } from "react";
import { format, parseISO } from "date-fns";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useExpensesContext } from "../contexts/Expense";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { InputAdornment, MenuItem, Select, Typography } from "@mui/material";

export const ModalDelete = () => {
  const {
    changeModalDelete,
    category,
    openModal,
    currentMonth,
    deleteExpense,
    expenseToDelete,
  } = useExpensesContext();

  console.log(expenseToDelete, "<_______")

  const deleteCurrentExpense = () => {
    deleteExpense(expenseToDelete);
  };

  return (
    <Dialog open={true} onClose={() => null} fullWidth>
      <DialogTitle>{"Deletar Despesa"}</DialogTitle>
      <DialogContent sx={{ pt: "7px !important" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              Voce vai excluir a despesa:{" "}
              <b>{expenseToDelete.name.toUpperCase()}</b>. Tem certeza que
              deseja continuar?
            </Typography>
          </Grid>
          <Grid sx={{ mt: 2 }} item xs={6} direction="row-reverse">
            <Button
              onClick={deleteCurrentExpense}
              sx={{ mr: 2 }}
              variant="contained"
            >
              Sim
            </Button>
            <Button onClick={() => changeModalDelete(false)} variant="outlined">
              Não
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
