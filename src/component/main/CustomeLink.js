import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

const CustomeLink = ({ to, children, ...props }) => {
  const { pathname } = useParams();
  const isActive = pathname === to;
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};

export default CustomeLink;
