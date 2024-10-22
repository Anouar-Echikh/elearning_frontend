import React from "react"
import ListEvents from "./listInscriptions"

const ListArticles = () => {
    return (
        <div className="animated slideInUpTiny animation-duration-3">
            <div className="row mb-md-3">
                <div className="col-12">
                    <div className="jr-card-header mb-2 d-flex align-items-center">
                        <h2 className="mb-3 pl-2 font-weight-bold">Liste des membres</h2>
                    </div>
                    <div className="jr-card d-print-none">
                        <ListEvents/>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ListArticles;