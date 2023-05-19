import fgImg from "../assets/images/fg.png";

export default function Foregound() {
    return (
        <>
            <div className="foreground" style={fgStyles}></div>
        </>
    )
}

const fgStyles: any = {
    position: 'absolute',
    bottom: 0,
    width: "100%",
    height: "20vh",
    background: `url(${fgImg})`,
    backgroundRepeat: "repeat-x",
    backgroundSize: "contain",
};