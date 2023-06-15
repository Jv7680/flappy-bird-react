import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { makeStyles } from "@mui/styles";
import { Fragment } from 'react';

interface BreadcrumbProps {
    listBreadcrumb: string[];
};

export default function Breadcrumb(props: BreadcrumbProps) {
    const classes = useStyles();
    const { listBreadcrumb } = props;

    return (
        <div className={classes.root}>
            {
                listBreadcrumb.length > 0 && listBreadcrumb.map((item: string, index: number) => {
                    return (
                        <Fragment key={index}>
                            <NavigateNextIcon fontSize="inherit" />
                            {item}
                        </Fragment>
                    );
                })
            }
        </div>
    );
};

const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: "center",
        marginBottom: 16,
        marginLeft: -5,
        fontSize: 16,
    },
});