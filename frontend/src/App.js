// import "./App.css";
// import { BrowserRouter, Route, Switch} from "react-router-dom";
// import Login from "./pages/login";
// import Register from "./pages/register/index";
// import User from "./pages/user/index";
// import Category from "./pages/category/index";
// import EditUser from "./pages/user/edituser/index";
// import EditCategory from "./pages/category/editCategory/index";
// import EditBook from "./pages/book/editBook/index";
// import Book from "./pages/book/index";
// import BookList from "./pages/book-listing";
// import Header from "./components/header/index";
// import Footer from "./components/footer/index";

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//       <div className="wrapper">
//       <Header />
//       <main>
//         <Switch>
//           <Route exact path="/login" component={Login} />
//           <Route exact path="/" component={BookList} />
//           <Route exact path="/register" component={Register} />
//           {/* <Route exact path="/user" component={User} />
//           <Route exact path="/edit-user/:id" component={EditUser} />
//           <Route exact path="/category" component={Category} />
//           <Route exact path="/edit-category/:id" component={EditCategory} />
//           <Route exact path="/add-category" component={EditCategory} /> */}
//           <Route exact path="/book" component={Book} />
//           <Route exact path="/edit-book/:id" component={EditBook} />
//           <Route exact path="/add-book" component={EditBook} />
//           </Switch>
//           </main>
//             <Footer />
//           </div>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;


import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./utils/theme";
import "./assets/css/style.css";
import Header from "./components/header/index";
import Footer from "./components/footer/index";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainNavigation from "./components/MainNavigation";
import { AuthWrapper } from "./context/auth";

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<React.Suspense fallback={<></>}>
				<BrowserRouter>
					<AuthWrapper>
							<div className="wrapper">
								<Header />
								<main>
									<MainNavigation />
								</main>
								<Footer />
							</div>
					</AuthWrapper>
					<ToastContainer />
				</BrowserRouter>
			</React.Suspense>
		</ThemeProvider>
	);
};

export default App;


