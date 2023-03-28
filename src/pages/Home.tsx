import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import BarChartIcon from "@mui/icons-material/BarChart";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";

import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { useExpensesContext } from "../contexts/Expense";
import { Alert, Button, Snackbar } from "@mui/material";

import { ExpensesTable, Modal, ModalDelete } from "../components";
import { useLoginContext } from "../contexts/Login";

const mainListItems = (month, click) => (
  <>
    <ListItemButton
      selected={month === "janeiro"}
      onClick={(e: any) => click(e.target.innerText)}
    >
      <ListItemText primary="Janeiro" />
    </ListItemButton>
    <ListItemButton
      selected={month === "fevereiro"}
      onClick={(e: any) => click(e.target.innerText)}
    >
      <ListItemText primary="Fevereiro" />
    </ListItemButton>
    <ListItemButton
      selected={month === "março"}
      onClick={(e: any) => click(e.target.innerText)}
    >
      <ListItemText primary="Março" />
    </ListItemButton>
    <ListItemButton
      selected={month === "abril"}
      onClick={(e: any) => click(e.target.innerText)}
    >
      <ListItemText primary="Abril" />
    </ListItemButton>
    <ListItemButton
      selected={month === "maio"}
      onClick={(e: any) => click(e.target.innerText)}
    >
      <ListItemText primary="Maio" />
    </ListItemButton>
    <ListItemButton
      selected={month === "junho"}
      onClick={(e: any) => click(e.target.innerText)}
    >
      <ListItemText primary="Junho" />
    </ListItemButton>
    <ListItemButton
      selected={month === "julho"}
      onClick={(e: any) => click(e.target.innerText)}
    >
      <ListItemText primary="Julho" />
    </ListItemButton>
    <ListItemButton
      selected={month === "agosto"}
      onClick={(e: any) => click(e.target.innerText)}
    >
      <ListItemText primary="Agosto" />
    </ListItemButton>
    <ListItemButton
      selected={month === "setembro"}
      onClick={(e: any) => click(e.target.innerText)}
    >
      <ListItemText primary="Setembro" />
    </ListItemButton>
    <ListItemButton
      selected={month === "outubro"}
      onClick={(e: any) => click(e.target.innerText)}
    >
      <ListItemText primary="Outubro" />
    </ListItemButton>
    <ListItemButton
      selected={month === "novembro"}
      onClick={(e: any) => click(e.target.innerText)}
    >
      <ListItemText primary="Novembro" />
    </ListItemButton>
    <ListItemButton
      selected={month === "dezembro"}
      onClick={(e: any) => click(e.target.innerText)}
    >
      <ListItemText primary="Dezembro" />
    </ListItemButton>
    <ListItemButton
      selected={month === null}
      onClick={(e: any) => click(null)}
    >
      <ListItemText primary="Despesas gerais" />
    </ListItemButton>
  </>
);

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        João Lucas
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const Home = () => {
  const {
    openModal,
    changeModalCreate,
    getExpenses,
    getCategory,
    expensesPaid,
    expensesToBePaid,
    totalToPay,
    totalPaid,
    closeToast,
    toastIsOpen,
    currentMonth,
    changeMonth,
    login,
  } = useExpensesContext();
  const { logout } = useLoginContext();
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    getExpenses();
    getCategory();
    login();
  }, []);

  const vertical = "top";
  const horizontal = "right";

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    closeToast();
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        {openModal.create && <Modal />}
        {openModal.delete && <ModalDelete />}
        <Snackbar
          open={toastIsOpen.open}
          anchorOrigin={{ vertical, horizontal }}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {toastIsOpen.message}
          </Alert>
        </Snackbar>

        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <Chip label={`A pagar: R$ ${totalToPay.toFixed(2)}`} color="error" />
            <Chip
              label={`Pago: R$ ${totalPaid.toFixed(2)}`}
              color="success"
              sx={{ ml: 2 }}
            />
            <Typography  sx={{ ml: 2, flexGrow: 1 }}></Typography>

            <Button sx={{ flexGrow: 0 }} color="inherit" onClick={logout}>Sair</Button>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={true}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <BarChartIcon />
            </IconButton>
            <Typography>Despesas</Typography>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems(currentMonth.month, changeMonth)}
            <Divider sx={{ my: 1 }} />
            <ListItemButton onClick={() => changeModalCreate(true)}>
              <Button variant="contained" endIcon={<AddIcon />}>
                Despesa
              </Button>
            </ListItemButton>
            <ListItemButton>
              <Button variant="contained" endIcon={<AddIcon />}>
                Categoria
              </Button>
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {currentMonth.value >= new Date().getMonth() + 1 && (
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <ExpensesTable title="A PAGAR" data={expensesToBePaid} />
                  </Paper>
                </Grid>
              )}
              {currentMonth.value <= new Date().getMonth() + 1 && (
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <ExpensesTable title="PAGO" data={expensesPaid} />
                  </Paper>
                </Grid>
              )}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
