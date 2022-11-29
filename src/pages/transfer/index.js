import React, { useEffect, useState } from "react";
import Image from "next/image";

// import css
import css from "../../styles/Transfer.module.css";

// import components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";
import Layout from "../../components/Layout";
import CardProfileTransfer from "../../components/card_profile_transfer/ProfileTransfer";
import Drawers from "../../components/drawer/Drawer";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function Transfer() {
   const router = useRouter();
   // const query = router.query;
   const [data, setData] = useState([]);
   const [pagination, setPagination] = useState([]);
   const [search, setSearch] = useState("");
   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(10);

   const searchHandler = (e) => {
      if (e.key === "Enter") {
         // router.push({
         //    pathname: `/transfer/?search=${e.target.value}`,
         // });
         // console.log("do validate");
         setSearch(e.target.value);
      }
   };
   useEffect(() => {
      const getToken = Cookies.get("token");

      axios
         .get(
            `https://fazzpay-rose.vercel.app/user?page=${page}&limit=${limit}&search=${search}`,

            {
               headers: {
                  Authorization: `Bearer ${getToken}`,
               },
            }
         )
         .then((res) => {
            // console.log(res.data);
            setData(res.data.data);
            setPagination(res.data.pagination);
         })
         .catch((err) => {
            console.log(err);
         });
   }, [search]);

   const getData = () => {
      const getToken = Cookies.get("token");

      axios
         .get(
            `https://fazzpay-rose.vercel.app/user?page=${page}&limit=${limit}&search=${search}`,

            {
               headers: {
                  Authorization: `Bearer ${getToken}`,
               },
            }
         )
         .then((res) => {
            // console.log(res.data);
            setData(res.data.data);
            setPagination(res.data.pagination);
         })
         .catch((err) => {
            console.log(err);
         });
   };
   return (
      <>
         <Layout title="Transfer">
            <Header />
            <div className={`container-fluid ${css.background_container}`}>
               <div className={`container d-flex gap-4 ${css.content_inti}`}>
                  <section className="col-12 col-sm-12 col-md-3 d-none d-sm-none d-lg-block ">
                     <Sidebar page="transfer" />
                  </section>
                  <div
                     className={`col-lg-9 col-md-12 col-sm-12 ${css.content_right}`}
                  >
                     <div className={""}>
                        <p className={css.search_receiver}>Search Receiver</p>
                        {/* search box */}
                        <div className={css.search_box}>
                           <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                           <input
                              type="text"
                              name=""
                              id=""
                              placeholder="Search receiver here"
                              onKeyDown={searchHandler}
                           />
                        </div>
                        {/* profile */}
                        <div className={css.scroll_bar}>
                           <div className={css.scroll}>
                              {data.map((user) => (
                                 <CardProfileTransfer
                                    key={user.id}
                                    idUser={user.id}
                                    images={
                                       user.image === null
                                          ? `${process.env.CLOUDINARY_LINK}`
                                          : `${process.env.CLOUD}${user.image}`
                                    }
                                    name={user.firstName}
                                    noTelp={user.noTelp}
                                 />
                              ))}
                           </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                           {page <= 1 ? (
                              <button
                                 disabled
                                 className="btn btn-primary mx-2 fw-bold"
                                 onClick={() => {
                                    setPage(page - 1);
                                    getData();
                                 }}
                              >
                                 prev
                              </button>
                           ) : (
                              <button
                                 className="btn btn-primary mx-2 fw-bold"
                                 onClick={() => {
                                    setPage(page - 1);
                                    getData();
                                 }}
                              >
                                 prev
                              </button>
                           )}

                           <p>
                              {data === [] ? setPage(0) : page} /{" "}
                              {pagination.totalPage}
                           </p>
                           {page === pagination.totalPage ? (
                              <button
                                 disabled
                                 className="btn btn-primary mx-2 fw-bold"
                                 onClick={() => {
                                    setPage(page + 1);
                                    getData();
                                 }}
                              >
                                 next
                              </button>
                           ) : (
                              <button
                                 className="btn btn-primary mx-2 fw-bold"
                                 onClick={() => {
                                    setPage(page + 1);
                                    getData();
                                 }}
                              >
                                 next
                              </button>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <Footer />
            <Drawers pages="transfer" />
         </Layout>
      </>
   );
}

export default Transfer;
