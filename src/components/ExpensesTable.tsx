import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Avatar,
  Chip,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useExpensesContext } from "../contexts/Expense";
// import Title from './Title';

// Generate Order Data
function createData(
  name: string,
  invoiceDueDate: string,
  category: string,
  value: number,
  color: string,
  id: number
) {
  return { name, invoiceDueDate, category, value, color, id };
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export function ExpensesTable({ data, title }) {
  console.log(data);

  const {changeModalDelete} = useExpensesContext()

  const rows = data.map((expense) =>
    createData(
      expense.name,
      expense.invoice_due_date,
      expense.category,
      expense.value,
      expense.color,
      expense.id
    )
  );

  return (
    <React.Fragment>
      {/* <Title>Recent Orders</Title> */}
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {title}
        </Typography>
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Despesa</TableCell>
            <TableCell>Data de Vencimento</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell align="right">Valor R$</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.invoiceDueDate}</TableCell>
              <TableCell>
                <Chip
                  label={row.category}
                  sx={{ bgcolor: row.color, color: "white" }}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
              <TableCell align="right" sx={{ width: "112px" }}>
                <IconButton>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => changeModalDelete(true, row)}>
                  <DeleteIcon color="primary" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
