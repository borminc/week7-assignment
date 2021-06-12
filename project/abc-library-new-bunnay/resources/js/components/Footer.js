import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import {faInstagram } from "@fortawesome/free-brands-svg-icons";
import {faTwitter } from "@fortawesome/free-brands-svg-icons";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import {faPhoneVolume} from "@fortawesome/free-solid-svg-icons";
class Footer extends Component {
    render() {
        return (
            <div>
                <footer class="footer bg-light">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6 text-muted">
                                <h3>About</h3>
                                <p class="small">There are many variations of passages of Lorem Ipsum available, but the majority have suffered lebmid alteration in some ledmid form. There are many variations of passages of Lorem Ipsum available, but the majority have suffered lebmid alteration in some ledmid form</p>
                                <small class="text-left text-muted"><FontAwesomeIcon icon={faMapMarkerAlt} />  Address: #34, Mornivong Blvd, Phnom Penh, Cambodia</small><br />
                                <small class="text-left text-muted"><FontAwesomeIcon icon={faPhoneVolume} /> Tel: 012 222 333</small>
                            </div>
                            <div class="col-lg-6 text-muted">
                                    <ul class="list-inline text-center">
                                        <li class="list-inline-item"><a href="#t" class="text-decoration-none text-muted">Terms of Use</a></li>
                                        <li class="list-inline-item"> | </li>
                                        <li class="list-inline-item"><a href="#p" class="text-decoration-none text-muted">Privacy Policy</a></li>
                                    </ul>
                                    <ul class="list-inline text-center">
                                        <li class="list-inline-item"><a href="#!" class="text-muted h4 pb-2"><FontAwesomeIcon icon={faFacebook} /></a></li>
                                        <li class="list-inline-item"><a href="#!" class="text-muted h4 pb-2"><FontAwesomeIcon icon={faInstagram} /></a></li>
                                        <li class="list-inline-item"><a href="#!" class="text-muted h4 pb-2"><FontAwesomeIcon icon={faTwitter} /></a></li>
                                    </ul>
                            </div>
                        </div>
                    </div>
                </footer>
                <p class="text-light small mb-4 mb-lg-0 bg-secondary p-2 text-center">&copy; ABC Library 2021. All Rights Reserved.</p>
            </div>
        )
    }
}

export default Footer;