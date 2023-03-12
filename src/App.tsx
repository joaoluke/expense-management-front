import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
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
import MenuIcon from "@mui/icons-material/Menu";
import BarChartIcon from "@mui/icons-material/BarChart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";

import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
// import { mainListItems, secondaryListItems } from "./listItems";

import { useExpensesContext } from "./contexts/Expense";
import { Button } from "@mui/material";

import { ExpensesTable, Modal, ModalDelete } from "./components";
const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemText primary="Janeiro" />
    </ListItemButton>
    <ListItemButton>
      <ListItemText primary="Fevereiro" />
    </ListItemButton>
    <ListItemButton>
      <ListItemText primary="Março" />
    </ListItemButton>
    <ListItemButton>
      <ListItemText primary="Abril" />
    </ListItemButton>
    <ListItemButton>
      <ListItemText primary="Maio" />
    </ListItemButton>
    <ListItemButton>
      <ListItemText primary="Junho" />
    </ListItemButton>
    <ListItemButton>
      <ListItemText primary="Julho" />
    </ListItemButton>
    <ListItemButton>
      <ListItemText primary="Agosto" />
    </ListItemButton>
    <ListItemButton>
      <ListItemText primary="Setembro" />
    </ListItemButton>
    <ListItemButton>
      <ListItemText primary="Outubro" />
    </ListItemButton>
    <ListItemButton>
      <ListItemText primary="Novembro" />
    </ListItemButton>
    <ListItemButton>
      <ListItemText primary="Dezembro" />
    </ListItemButton>
  </React.Fragment>
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
        Your Website
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

const App = () => {
  const {
    openModal,
    changeModalCreate,
    getExpenses,
    getCategory,
    expensesPaid,
    expensesToBePaid,
    totalToPay,
    totalPaid,
  } = useExpensesContext();
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    getExpenses();
    getCategory();
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        {openModal.create && <Modal />}
        {openModal.delete && <ModalDelete />}
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <Chip label={`A pagar: R$ ${totalToPay}`} color="success" />
            <Chip
              label={`Pago: R$ ${totalPaid}`}
              color="error"
              sx={{ ml: 2 }}
            />
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
            {mainListItems}
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
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <ExpensesTable title="A PAGAR" data={expensesToBePaid} />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <ExpensesTable title="PAGO" data={expensesPaid} />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
