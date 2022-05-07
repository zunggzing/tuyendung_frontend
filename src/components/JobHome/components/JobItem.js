import React, { Fragment } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import classes from "./JobItem.module.css";
import clsx from "clsx";
import { Tooltip } from "antd";

const JobItem = (props) => {
  const {
    jobItemImageWrapper,
    jobItemParagraph,
    jobItemImage,
    jobItemFavoriteWrapper,
  } = classes;
  const styleImage = clsx(jobItemImageWrapper, "rounded");
  console.log("AAAA", props.jobs);
  const { nhaTuyenDung, tieuDe, mucLuong, diaDiem } = props.jobs;

  return (
    <Fragment>
      <div className={classes + "border"}>
        <div className="job-item-wrapper">
          <div className="d-flex align-items-center position-relative flex-wrap">
            <div className={styleImage}>
              <Tooltip placement="top" title={nhaTuyenDung.tenCongty}>
                <a href="#" className="text-decoration-none">
                  <img
                    className={clsx([jobItemImage, "rounded"])}
                    src={`https://webtuyendung.s3.ap-southeast-1.amazonaws.com/IMG_5700.JPG`}
                    alt="Logo"
                  />
                </a>
              </Tooltip>
            </div>
            <div className={clsx([jobItemParagraph, "mt-3 px-3"])}>
              <Tooltip placement="top" title={tieuDe}>
                <a href="#" className="titleParagraphOne text-dark fw-bold">
                  <strong>{tieuDe}</strong>
                </a>
              </Tooltip>
              <Tooltip placement="top" title={nhaTuyenDung.tenCongty}>
                <p>
                  <a
                    href="#"
                    className="titleParagraphOne text-decoration-none text-muted"
                  >
                    {nhaTuyenDung.tenCongty}
                  </a>
                </p>
              </Tooltip>
            </div>
            <div className={jobItemFavoriteWrapper}>
              <div className="jobItemFavorite border border-secondary rounded position-absolute top-0 end-0 px-2 badge bg-light text-dark">
                <AiOutlineHeart className="fs-12" />
              </div>
            </div>
          </div>
          <div className="d-flex mt-2">
            <div className="jobItemSalary cursorDefault">
              <span className="badge bg-secondary me-3">{mucLuong}</span>
            </div>
            <div className="jobItemAddress cursorDefault">
              <span>
                <Tooltip
                  placement="top"
                  title={`${diaDiem.tinhThanhPho} - ${diaDiem.quanHuyen}`}
                >
                  <span className="titleParagraphOne">
                    {diaDiem.tinhThanhPho} - {diaDiem.quanHuyen}
                  </span>
                </Tooltip>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default JobItem;
