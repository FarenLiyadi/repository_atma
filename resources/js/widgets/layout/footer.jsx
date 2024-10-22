import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";

export function Footer({ routes }) {
    const year = new Date().getFullYear();

    return (
        <footer className="py-2">
            <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
                <Typography
                    variant="small"
                    className="font-normal text-inherit"
                >
                    &copy; {year}{" "}
                    <a
                        href={"#"}
                        target="_blank"
                        className="transition-colors hover:text-red-600 font-bold"
                    >
                        Atma jaya Makassar
                    </a>{" "}
                </Typography>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
