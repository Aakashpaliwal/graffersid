import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import './Area.css'
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   PDFViewer
// } from "@react-pdf/renderer";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { PDFExport } from "@progress/kendo-react-pdf";
// import { Document, Page } from 'react-pdf';
// const options = {
//   cMapUrl: 'cmaps/',
//   cMapPacked: true,
// };

export class Invoice extends Component {
  pdfExportComponent;
  // Add this method to the React
  // exportPDF = () => {
  //   this.resume.save();
  // }
  // state = {
  //   file: './somefile.pdf',
  //   numPages: null,
  //   pageNumber: 1,
  // }
  // onFileChange = (event) => {
  //   this.setState({
  //     file: event.target.files[0],
  //   });
  // }
  // onDocumentLoadSuccess = ({ numPages }) => {
  //   this.setState({ numPages });
  // }
  printDocument() {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });

    // const input2 = document.getElementById("divToPrint2");
    // html2canvas(input2).then(canvas => {
    //   const imgData = canvas.toDataURL("image/png");
    //   const pdf = new jsPDF();
    //   pdf.addImage(imgData, "JPEG", 0, 0);
    //   // pdf.output('dataurlnewwindow');
    //   pdf.save("download2.pdf");
    // });
  }
  render() {
    // const { file, pageNumber, numPages } = this.state;
    var style = {
      backgroundColor: "#f5f5f5",
      width: "210mm",
      height: "297mm",
      // marginLeft: 'auto',
      // marginRight: 'auto',
      paddingLeft: "10px",
      paddingRight: "10px"
    };
    // const styles = StyleSheet.create({
    //   page: {
    //     flexDirection: "row"
    //   },
    //   section: {
    //     flexGrow: 1
    //   }
    // });

    // const MyDocument = (
    //     <Document>
    //       <Page size="A4" style={styles.page}>
    //         <View style={styles.section}>
    //           <Text>Hello World!</Text>
    //         </View>

    //       </Page>
    //     </Document>
    //   );
    return (
      <React.Fragment>
        <div>
          <div className="skin-blue fixed-layout">
            <div className="page-wrapper">
              <div className="container-fluid">
                <div className="row page-titles">
                  <div className="col-md-5 align-self-center">
                    {/* <h4 className="text-themecolor">Forms</h4> */}
                    <nav aria-label="breadcrumb">
                      <ol class="breadcrumb">
                        <li className="breadcrumb-todo">
                          <Link to="/">Home</Link>
                        </li>
                        <li
                          className="breadcrumb-todo active"
                          aria-current="page"
                        >
                          View Area
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="custom-table-here">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="custom-table-product">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            {/* <Link to={process.env.PUBLIC_URL + "/Area"}> */}{" "}
                            <button
                              type="button"
                              className="btn btn-info"
                              style={{ float: "right" }}
                              // onClick={this.printDocument}
                              onClick={() => {
                                this.pdfExportComponent.save();
                              }}
                            >
                              &nbsp;&nbsp;&nbsp;download
                            </button>
                            {/* </Link> */}
                            <br />
                            <br />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            {/* <PDFViewer>{MyDocument}</PDFViewer> */}
                            {/* <div id="divToPrint" className="mt4" style={style}>
                              <div className="custom-top-para-invoice">
                                <h4>company film</h4>
                                <p>123 Madison drive, Seattle, WA, 7829Q </p>
                                <p>990-120-4560</p>
                                <br />
                                <br />
                                <div className="row">
                                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <p>
                                      <strong>Bill To </strong>
                                    </p>
                                    <hr />
                                    <p>Allen Smith</p>
                                    <p>87 Private st, Seattle, WA</p>
                                    <p>allen@gmail.com </p>
                                    <p>990-302-1898</p>
                                  </div>
                                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <div
                                      className="right-content"
                                      style={{ float: "right" }}
                                    >
                                      <p>
                                        <strong>Invoice no. : </strong>{" "}
                                        #INV02081{" "}
                                      </p>
                                    </div>
                                  </div>
                                  <br />
                                  <br />
                                </div>
                              </div>
                              <table className="table table-responsive-sm table-bordered">
                                <thead className="thead-dark">
                                  <tr>
                                    <th scope="col">description</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Unit Price</th>
                                    <th scope="col">Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Installed new kitchen sink (hours)</td>
                                    <td>3.00</td>
                                    <td>50.00</td>
                                    <td>150.00</td>
                                  </tr>
                                  <tr>
                                    <td>Installed new kitchen sink (hours)</td>
                                    <td>3.00</td>
                                    <td>50.00</td>
                                    <td>150.00</td>
                                  </tr>
                                  <tr>
                                    <td>Installed new kitchen sink (hours)</td>
                                    <td>3.00</td>
                                    <td>50.00</td>
                                    <td>150.00</td>
                                  </tr>
                                </tbody>
                              </table>
                              <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <h5>Thank you for business</h5>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <div
                                    className="right-content"
                                    style={{ float: "right" }}
                                  >
                                    <p>
                                      <strong>Subtotal : </strong> 2590.00
                                    </p>
                                    <p>
                                      <strong>DISCOUNT : </strong> 50.00
                                    </p>
                                    <p>
                                      <strong>SUBTOTAL LESS DISCOUNT : </strong>{" "}
                                      2540.00
                                    </p>
                                    <p>
                                      <strong>TAX RATE : </strong> 12.00 %
                                    </p>
                                    <p>
                                      <strong>TOTAL TAX : </strong> 304.80
                                    </p>
                                    <hr />
                                    <p>
                                      Balance Due : <strong>$2,844.80</strong>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div> */}
                            {/* <hr />
                            <div id="divToPrint2" className="mt4" style={style}>
                              <div className="custom-top-para-invoice">
                                <h4>company film</h4>
                                <p>123 Madison drive, Seattle, WA, 7829Q </p>
                                <p>990-120-4560</p>
                                <br />
                                <br />
                                <div className="row">
                                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <p>
                                      <strong>Bill To </strong>
                                    </p>
                                    <hr />
                                    <p>Allen Smith</p>
                                    <p>87 Private st, Seattle, WA</p>
                                    <p>allen@gmail.com </p>
                                    <p>990-302-1898</p>
                                  </div>
                                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <div
                                      className="right-content"
                                      style={{ float: "right" }}
                                    >
                                      <p>
                                        <strong>Invoice no. : </strong>{" "}
                                        #INV02081{" "}
                                      </p>
                                    </div>
                                  </div>
                                  <br />
                                  <br />
                                </div>
                              </div>
                              <table className="table table-responsive-sm table-bordered">
                                <thead className="thead-dark">
                                  <tr>
                                    <th scope="col">description</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Unit Price</th>
                                    <th scope="col">Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Installed new kitchen sink (hours)</td>
                                    <td>3.00</td>
                                    <td>50.00</td>
                                    <td>150.00</td>
                                  </tr>
                                  <tr>
                                    <td>Installed new kitchen sink (hours)</td>
                                    <td>3.00</td>
                                    <td>50.00</td>
                                    <td>150.00</td>
                                  </tr>
                                  <tr>
                                    <td>Installed new kitchen sink (hours)</td>
                                    <td>3.00</td>
                                    <td>50.00</td>
                                    <td>150.00</td>
                                  </tr>
                                </tbody>
                              </table>
                              <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <h5>Thank you for business</h5>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <div
                                    className="right-content"
                                    style={{ float: "right" }}
                                  >
                                    <p>
                                      <strong>Subtotal : </strong> 2590.00
                                    </p>
                                    <p>
                                      <strong>DISCOUNT : </strong> 50.00
                                    </p>
                                    <p>
                                      <strong>SUBTOTAL LESS DISCOUNT : </strong>{" "}
                                      2540.00
                                    </p>
                                    <p>
                                      <strong>TAX RATE : </strong> 12.00 %
                                    </p>
                                    <p>
                                      <strong>TOTAL TAX : </strong> 304.80
                                    </p>
                                    <hr />
                                    <p>
                                      Balance Due : <strong>$2,844.80</strong>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div> */}
                            {/* <button
                              onClick={() => {
                                this.pdfExportComponent.save();
                              }}
                            >
                              download
                            </button> */}
                            <PDFExport
                              paperSize="A4"
                              margin="1cm"
                              ref={component =>
                                (this.pdfExportComponent = component)
                              }
                            >
                              <div
                                className="custom-top-para-invoice"
                                // style={{
                                //   height: 792,
                                //   width: 612,
                                //   padding: "none",
                                //   backgroundColor: "white",
                                //   boxShadow: "5px 5px 5px black",
                                //   margin: "auto",
                                //   overflowX: "hidden",
                                //   overflowY: "hidden"
                                // }}
                              >
                                <h4>company film</h4>
                                <p>123 Madison drive, Seattle, WA, 7829Q </p>
                                <p>990-120-4560</p>
                                <br />
                                <br />
                                <div className="row">
                                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <p>
                                      <strong>Bill To </strong>
                                    </p>
                                    <hr />
                                    <p>Allen Smith</p>
                                    <p>87 Private st, Seattle, WA</p>
                                    <p>allen@gmail.com </p>
                                    <p>990-302-1898</p>
                                  </div>
                                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <div
                                      className="right-content"
                                      style={{ float: "right" }}
                                    >
                                      <p>
                                        <strong>Invoice no. : </strong>{" "}
                                        #INV02081{" "}
                                      </p>
                                    </div>
                                  </div>
                                  <br />
                                  <br />
                                </div>
                              </div>
                              <table className="table table-responsive-sm table-bordered">
                                <thead className="thead-dark">
                                  <tr>
                                    <th scope="col">description</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Unit Price</th>
                                    <th scope="col">Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Installed new kitchen sink (hours)</td>
                                    <td>3.00</td>
                                    <td>50.00</td>
                                    <td>150.00</td>
                                  </tr>
                                  <tr>
                                    <td>Installed new kitchen sink (hours)</td>
                                    <td>3.00</td>
                                    <td>50.00</td>
                                    <td>150.00</td>
                                  </tr>
                                  <tr>
                                    <td>Installed new kitchen sink (hours)</td>
                                    <td>3.00</td>
                                    <td>50.00</td>
                                    <td>150.00</td>
                                  </tr>
                                </tbody>
                              </table>
                              <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <h5>Thank you for business</h5>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <div
                                    className="right-content"
                                    style={{ float: "right" }}
                                  >
                                    <p>
                                      <strong>Subtotal : </strong> 2590.00
                                    </p>
                                    <p>
                                      <strong>DISCOUNT : </strong> 50.00
                                    </p>
                                    <p>
                                      <strong>SUBTOTAL LESS DISCOUNT : </strong>{" "}
                                      2540.00
                                    </p>
                                    <p>
                                      <strong>TAX RATE : </strong> 12.00 %
                                    </p>
                                    <p>
                                      <strong>TOTAL TAX : </strong> 304.80
                                    </p>
                                    <hr />
                                    <p>
                                      Balance Due : <strong>$2,844.80</strong>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </PDFExport>
                            
                            {/* <input
              onChange={this.onFileChange}
              type="file"
            />
                            <Document
         file={file}
              onLoadSuccess={this.onDocumentLoadSuccess}
              options={options}
        >
          {
                Array.from(
                  new Array(numPages),
                  (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                    />
                  ),
                )
              }
        </Document>
        <p>Page {pageNumber} of {numPages}</p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Invoice;
