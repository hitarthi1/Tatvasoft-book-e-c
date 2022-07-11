import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { productListingStyle } from "./style";
import { materialCommonStyles } from "../../utils/materialCommonStyles";
import {
  Typography,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import prodcutImage from "../../assets/images/levis.png";
import { defaultFilter, StatusCode } from "../../constant/constant";
  import bookService from "../../service/book/book.service";
//import { IListBook } from "../../service/book/book.model";

import { AuthContextModel, useAuthContext } from "../../context/auth";
import { useHistory } from "react-router-dom";
// import { CartContext, CartContextModel, useCartContext } from "../../context/cart";






const BookList= () => {
  const authContext = useAuthContext();
	// const cartContext: CartContextModel= useCartContext();
	

  const classes = productListingStyle();
  const materialClasses = materialCommonStyles();
  const filter = defaultFilter;
   filter.pageSize = 12;
  const [filters, setFilters] = useState(filter);
   const [bookRecords, setBookRecords] = useState([]);
	const [sortBy, setSortBy] = useState();


  useEffect(() => {
    searchAllBooks();

  }, []);

  useEffect(() => {
    searchAllBooks();
  }, [filters]);

  useEffect(() => {

		const timer = setTimeout(() => {
			if (filters.keyword === "") delete filters.keyword;
			searchAllBooks({ ...filters });
		}, 500);
		return () => clearTimeout(timer);


	}, [filters]);


  const searchAllBooks = () => {
    console.log(filters);
    bookService.getAll(filters).then((res) => {


      if (res ) {
        console.log(res);
        setBookRecords(res);
      }
    });
  };

	// const addToCart = (book: BookModel): void => {
	// 	if (!authContext.user.id) {
	// 		toast.error("Please login before adding books to cart");
	// 		history.push(RoutePaths.Register);
	// 		return;
	// 	} else {
	// 		Shared.addToCart(book, authContext.user.id).then(res=>{
	// 			if(res.error){
	// 				toast.error(res.message)
	// 			}else{
	// 				toast.success(res.message)
	// 				cartContext.updateCart()
	// 			}
	// 		})
	// 	}
	// };

  const sortBooks = (e) => {
		setSortBy(e.target.value);
		bookRecords.sort((a, b) => {
			if (a.name < b.name) {
				return e.target.value === "a-z" ? -1 : 1;
			}
			if (a.name > b.name) {
				return e.target.value === "a-z" ? 1 : -1;
			}
			return 0;
		});
	};

  return (
    <div className={classes.productListWrapper}>
      <div className="container">
        <Typography variant="h1">Book Listing</Typography>


        <div className="title-wrapper">
          {/* {bookRecords?.length && (
            <Typography variant="h2">
              Total Records
              <span> - {bookRecords[0].totalRecords} items</span>
            </Typography>
          )} */}
          			
					<div className="dropdown-wrapper">
						<TextField
							id="text"
							className="dropdown-wrapper"
							name="text"
							placeholder="Search..."
							variant="outlined"
							inputProps={{ className: "small" }}
							onChange={(e) => {
								setFilters({
									...filters,
									keyword: e.target.value,
									pageIndex: 1,
								});
							}}
						/>
					</div>


          <FormControl className="dropdown-wrapper" variant="outlined">
            <InputLabel htmlFor="select">Sort By</InputLabel>
            <Select
              className={materialClasses.customSelect}
              MenuProps={{
                classes: { paper: materialClasses.customSelect },
                
              }}onChange={sortBooks}
							value={sortBy}
            >
              <MenuItem value="a-z">a - z</MenuItem>
              <MenuItem value="z-a">z - a</MenuItem>
            </Select>
          </FormControl>


        </div>



        <div className="product-list-wrapper">
          <div className="product-list-inner-wrapper">
            {bookRecords?.map((book) => (
              <div className="product-list" key={book.id}>
                <div className="product-list-inner">
                  <em>
                    <img src={book.base64image} alt={book.name} />
                   
                  </em>
                  <div className="content-wrapper">
                    <Typography variant="h3">{book.bookname}</Typography>
                    <p className="description">{book.description}</p>
                    <p className="description">{book.cat}</p>
                    <p className="price">
                      <span className="discount-price">MRP</span>
                      &#8377; {book.price}
                    </p>
                    <button className="MuiButtonBase-root MuiButton-root MuiButton-contained btn pink-btn MuiButton-containedPrimary MuiButton-disableElevation">
                      <span className="MuiButton-label"
                      // onClick={() => addToCart(book)}
                                        >ADD TO CART</span>
                      <span className="MuiTouchRipple-root"></span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {bookRecords?.length && (
          <div className="pagination-wrapper" style={{margin:'auto'}}>
            <Pagination 
              count={Math.ceil(bookRecords.length / 10)}
              page={filters.pageIndex}
              onChange={(e, page) => {
                console.log({e},{page})
                setFilters({ ...filter,pageIndex:  page });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;
