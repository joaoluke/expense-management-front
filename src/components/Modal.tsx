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
import { InputAdornment, MenuItem, Select } from "@mui/material";

export const Modal = () => {
  const {
    changeModalCreate,
    category,
    openModal,
    createExpenses,
    handleChange,
    handleDateChange,
    handleSubmit,
    formData,
    generateMonthList,
    monthCurrent,
  } = useExpensesContext();

  return (
    <Dialog open={true} onClose={() => null} fullWidth>
      <DialogTitle>{"Nova Despesa"}</DialogTitle>
      <DialogContent sx={{ pt: "7px !important" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Nome"
                value={formData.expense}
                onChange={handleChange}
                name="expense"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label="Data de Vencimento"
                sx={{ width: "100%" }}
                value={formData.date}
                onChange={handleDateChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Categoria"
                value={formData.category}
                onChange={handleChange}
                name="category"
                required
                select
                fullWidth
              >
                {category.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Valor"
                value={formData.value}
                onChange={handleChange}
                name="value"
                type="number"
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={formData.month}
                onChange={handleChange}
                name="month"
                label="Mes de Referencia"
                select
                fullWidth
              >
                {generateMonthList().map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.month}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={formData.status}
                onChange={handleChange}
                disabled={Number(formData.month) !== Number(monthCurrent)}
                name="status"
                label="Status"
                required
                select
                fullWidth
              >
                <MenuItem value="TO_PAY">A Pagar</MenuItem>
                <MenuItem value="PAID">Pago</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6} direction="row-reverse">
              <Button sx={{ mr: 2 }} type="submit" variant="contained">
                Criar
              </Button>
              <Button
                onClick={() => changeModalCreate(false)}
                variant="outlined"
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={() => null}>Cancelar</Button>
        <Button onClick={() => null} autoFocus>
          Criar
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};
