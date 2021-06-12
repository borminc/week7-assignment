const Borrow = () => {

    return (
        <>
            <br></br><br></br>
            <div class="container pt-5 mt-5">
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-4">
                                <img src={"https://picsum.photos/id/30/200/250"} className="card-img-top" alt="" />
                            </div>
                            <div class="col-8">
                                <table className="table small">
                                    <thead>
                                        <tr>
                                            <th className="display-5">Title</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Author</td>
                                            <td>Bunnay</td>
                                        </tr>
                                        <tr>
                                            <td>Year</td>
                                            <td>2000</td>
                                        </tr>
                                        <tr>
                                            <td>Publisher</td>
                                            <td>Kak</td>
                                        </tr>
                                        <tr>
                                            <td>Category</td>
                                            <td>CS</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container pt-2">
                    <h3>Description</h3>
                    <p>The present progressive is use to show an action that is happening at the moment of speaking. The present progressive is use to show an action that is happening at the moment of speaking. The present progressive is use to show an action that is happening at the moment of speaking. The present progressive is use to show an action that is happening at the moment of speaking.</p>
                </div>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-5 pt-3">
                        <div class="card">
                            <div class="card-header">
                                <h5>Rule and Policy</h5>
                            </div>
                            <div class="card-body">
                                <ul class="small">
                                    <li>Give the book back in a timely manner.</li>
                                    <li>Ask the lender when they need the book back.</li>
                                    <li>If it's taking a long time to read the book, check in with your friend.</li>
                                    <li>Don't write in, underline, or highlight ANYTHING.</li>
                                    <li>Don't take the book in the bath or to the pool.</li>
                                    <li>Ask permission before passing it on to another friend.</li>
                                    <li>Don't lose the dust jacket.</li>
                                    <li>Don't write in, underline, or highlight ANYTHING.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-7 pt-3">
                        <div class="card">
                            <div class="card-header">
                                <h5>Overdue Materials</h5>
                            </div>
                            <div class="card-body">
                                <ul class="small">
                                    <li>When any borrowed item becomes overdue, borrowing privileges are automatically suspended</li>
                                    <li>For items more than 30 days overdue, a bill for its replacement will be issued:
                                        <ul>
                                            <li>$30.00 or more for unbound journals</li>
                                            <li>$70.00 or more for most books</li>
                                            <li>$35.00 or more for Popular Reading items</li>
                                            <li>An additional $20.00 processing fee will be issued for all of the above</li>
                                        </ul>
                                    </li>
                                    <li>If the item is returned before a replacement copy is ordered, the $20.00 processing fee will stand but the replacement fee will be canceled</li>
                                    <li>Borrowing privileges will be restored after return of all late materials and/or payment of all fees</li>
                                    <li>Outstanding charges may be referred to a collection agency after 30 days, and registration blocks may be applied</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-end p-5">
                <button type="button" class="btn btn-primary">Borrow</button>
            </div>
        </>
    )

}
export default Borrow;