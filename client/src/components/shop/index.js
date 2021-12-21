import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { IconButton } from '@mui/material';
import { IoIosArrowDropleftCircle,IoIosArrowDroprightCircle } from "react-icons/io";
import { RiMenuUnfoldLine, RiMenuFoldLine } from "react-icons/ri";


import { productsByPaginate } from "store/actions/product-actions";
import { getAllBrands } from "store/actions/brands-actions";
import CardBlock from "utils/products/card-blocks";
import PaginationNav from "utils/paginationNav";
import SearchBar from "./searchBar";
import CollapseCheckbox from "./collapseCheckbox";
import Dropdown from 'react-bootstrap/Dropdown';
import RangeSelect from './rangeSelect'
import './index.css';



const defaultValues = {
  keywords: "",
  brand: [],
  category: [],
  minPuffs:0,
  maxPuffs:50000,
  minPrice:0,
  maxPrice:100,
  items:8,
  page: 1
};


const Shop = () => {
  const [toggled, setToggled] = useState(true);
  const [searchValues, setSearchValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    defaultValues
  );
  const { byPaginate } = useSelector((state) => state.products);
  const brands = useSelector((state) => state.brands);
  const dispatch = useDispatch();

  const goToPage = (page) => {
    console.log(page);
    setSearchValues({ page: page });
  };

  const handleResetSearch = () => {
    setSearchValues({ keywords: "", page:1 });
  };

  const handleKeywords = (values) => {
    setSearchValues({ keywords: values, page:1 })
  }

  const handleFilters = (filters,category) => {
    if(category === 'category'){
      setSearchValues({ category: filters, page:1 })
    }
    if(category === 'brands'){
      setSearchValues({ brand: filters, page:1 })
    }
    
  }

  const handleRange = (values) => {
    setSearchValues({ minPuffs:values[0],maxPuffs:values[1],minPrice:values[2],maxPrice:values[3], page:1 }) 
  }

  const handleItems = (item) => {
    setSearchValues({ items: item})
  }

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  useEffect(() => {
    dispatch(productsByPaginate(searchValues));
  }, [dispatch, searchValues]);

  return (
    <>
      <div className="user_container">
        {toggled ? (
          <ProSidebar>
            {/* <SidebarHeader
              style={{
                padding: "24px",
                textTransform: "uppercase",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "22px",
                letterSpacing: "1px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Filter
            </SidebarHeader> */}
            <SidebarContent
              style={{
                fontFamily: "Roboto",
                fontWeight: "bold",
                paddingLeft: "1.2rem",
              }}
            >
              <Menu iconShape="round" style={{ marginTop: "50px" }}>
                <MenuItem>
                  Category
                  <CollapseCheckbox
                    initState={false}
                    title=""
                    list={[
                      { _id: "Disposable Vape", name: "Disposable Vape" },
                      { _id: "Delta", name: "Delta" }
                    ]}
                    handleFilters={(filters) => handleFilters(filters, "category")}
                  />
                </MenuItem>
                <MenuItem>
                  Brands
                  <CollapseCheckbox
                    initState={true}
                    title=""
                    list={brands.all}
                    handleFilters={(filters) =>
                      handleFilters(filters, "brands")
                    }
                  />
                </MenuItem>
                <MenuItem style={{ marginTop: "30px" }}>
                  Sort by
                  <RangeSelect handleRange={(values) => handleRange(values)} />
                </MenuItem>
              </Menu>
            </SidebarContent>
          </ProSidebar>
        ) : null}
        <div className="user_right">
          {toggled ? (
            <IconButton
              onClick={() => setToggled(false)}
              color="primary"
              size="large"
            >
              <RiMenuFoldLine />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => setToggled(true)}
              color="secondary"
              size="large"
            >
              <RiMenuUnfoldLine />
            </IconButton>
          )}

          <div className="dashboard_title">
            <h1>Our Collection</h1>
          </div>
          <SearchBar handleKeywords={(values) => handleKeywords(values)} />
          <div>
            {byPaginate && byPaginate.docs ? (
              <>
                <Dropdown style={{ marginTop: "30px", marginLeft: "75%" }}>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Items
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleItems(6)}>
                      6
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleItems(8)}>
                      8
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleItems(9)}>
                      9
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleItems(12)}>
                      12
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <CardBlock items={byPaginate.docs} />
                <PaginationNav
                  prods={byPaginate}
                  prev={(page) => goToPage(page)}
                  next={(page) => goToPage(page)}
                  resetSearch={() => handleResetSearch()}
                />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
