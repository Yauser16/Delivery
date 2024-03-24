
const Spinner = () => {
    return (
        <div className="d-flex justify-content-center" style={{ "marginTop": "100px" }}>
            <div className="spinner-border text-primary" style={{ "width": "3rem", "height": "3rem" }} role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>
    )
}

export default Spinner;