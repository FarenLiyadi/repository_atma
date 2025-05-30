import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { FaBuildingUser } from "react-icons/fa6";
import { FaCloudArrowUp } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
// import { FaCloudArrowUp } from "react-icons/fa6";
import { FaServer } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";

export function StatisticsCard({ color, icon, title, value, footer }) {
    return (
        <Card className="border border-blue-gray-100 shadow-sm">
            <CardHeader
                variant="gradient"
                color={color}
                floated={false}
                shadow={false}
                className="absolute grid h-12 w-12 place-items-center"
            >
                {icon == "tata_usaha" && <FaBuildingUser className="h-8 w-8" />}
                {icon == "dosen" && <GiTeacher className="h-8 w-8" />}
                {icon == "server" && <FaServer className="h-8 w-8" />}
                {icon == "used" && <FaDownload className="h-8 w-8" />}
                {icon == "free" && <FaCloudArrowUp className="h-8 w-8" />}
            </CardHeader>
            <CardBody className="p-4 text-right">
                <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                >
                    {title}
                </Typography>
                <Typography variant="h4" color="blue-gray">
                    {value}
                </Typography>
            </CardBody>
        </Card>
    );
}

StatisticsCard.defaultProps = {
    color: "blue",
    footer: null,
};

StatisticsCard.propTypes = {
    color: PropTypes.oneOf([
        "white",
        "blue-gray",
        "gray",
        "brown",

        "deep-orange",
        "orange",
        "amber",
        "yellow",
        "lime",
        "light-green",
        "green",
        "teal",
        "cyan",
        "light-blue",
        "blue",
        "indigo",
        "deep-purple",
        "purple",
        "pink",
        "red",
    ]),
    icon: PropTypes.node.isRequired,
    title: PropTypes.node.isRequired,
    value: PropTypes.node.isRequired,
    footer: PropTypes.node,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;

/**{footer && (
  <CardFooter className="border-t border-blue-gray-50 p-4">
      {footer}
  </CardFooter>
)}**/
