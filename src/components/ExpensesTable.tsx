import * as React from "react";
import { format, parseISO } from "date-fns";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Skeleton from "@mui/material/Skeleton";

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
  id: number,
  column: string
) {
  return { name, invoiceDueDate, category, value, color, id, column };
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export function ExpensesTable({ data, title }) {

  const { changeModalDelete, loading, editExpense } = useExpensesContext();

  const rows = data.map((expense) =>
    createData(
      expense.name,
      expense.invoice_due_date,
      expense.category,
      expense.value,
      expense.color,
      expense.id,
      expense.column
    )
  );

  function isDateBeforeToday(date) {
    const currentDate = new Date();
    return date.getTime() < currentDate.getTime();
  }

  return (
    <React.Fragment>
      {/* <Title>Recent Orders</Title> */}
      {!loading ? (
        <>
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
              {rows.length ? (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      {isDateBeforeToday(new Date(row.invoiceDueDate)) ? (
                        <b style={{ color: "#d3382f" }}>
                          {format(new Date(row.invoiceDueDate), "dd/MM/yyyy")}
                        </b>
                      ) : (
                        <>
                          {format(new Date(row.invoiceDueDate), "dd/MM/yyyy")}
                        </>
                      )}
                    </TableCell>
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
                        <EditIcon color="primary" onClick={() => editExpense(row)} />
                      </IconButton>
                      <IconButton onClick={() => changeModalDelete(true, row)}>
                        <DeleteIcon color="primary" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell style={{ padding: 40 }} align="center" colSpan={6}>
                    Sem despesas cadastradas
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      ) : (
        <div>
          <Skeleton animation="wave" style={{ height: 60 }} />
          <Skeleton animation="wave" style={{ height: 60 }} />
          <Skeleton animation="wave" style={{ height: 60 }} />
          <Skeleton animation="wave" style={{ height: 60 }} />
          <Skeleton animation="wave" style={{ height: 60 }} />
        </div>
      )}
    </React.Fragment>
  );
}
