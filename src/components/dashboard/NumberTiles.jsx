import React from "react";
import CountUp from "react-countup";
import ANTDCard from "../../shared/antd/ANTDCard";
import { ternary } from "../../utils/javascript";
const NumberTiles = ({
  title,
  subtitle,
  count,
  color,
  footerTitle,
  disabled,
  icon,
  suffix,
  prefix,
}) => {
  return (
    <ANTDCard
      className={`mb-10 text-center number-tiles ${ternary(
        disabled,
        "disable",
        ""
      )}`}
      style={{
        backgroundColor: color,
        borderRadius: "10px",
        height: "calc(100% - 10px)",
      }}
    >
      <div className="dash-icon">
        {icon && <img src={icon} alt={title} height={80} width={80} />}
      </div>
      <h4 className="f-weight-600">{title}</h4>
      {subtitle && <span>{subtitle}</span>}
      {count ? (
        <>
          <CountUp
            className="font-28 f-weight-600 mt-auto"
            start={0}
            end={count}
            duration={2.75}
            suffix={suffix}
            prefix={prefix}
            decimals={0}
          />
        </>
      ) : (
        "__ __"
      )}
      {footerTitle && <p>{footerTitle}</p>}
    </ANTDCard>
  );
};

export default NumberTiles;
