import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import toast from 'react-hot-toast';



// service_ur05fw6
const Contact = () => {

    

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                'service_ur05fw6',
                'template_g7xbg9l',
                form.current, {
                publicKey: 'dKzCB4t1t9ZgtE0LB',
            })
            .then(
                () => {
                    toast.success('Successfully Sent!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    return (
        <div className="hero min-h-screen py-20">
            <div className="hero-content flex-col gap-7 lg:flex-row-reverse">
                <div className="text-left">
                    <div className="">
                        <img src="https://i.ibb.co/hVyVwKD/Untitled-design-1.png" alt="" />
                    </div>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
                >
                    <form ref={form} onSubmit={sendEmail} className="card-body border-2 rounded-lg border-prime ">
                        <h1 className="text-3xl font-bold text-center">Get In Touch</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="from_name" placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="from_email" placeholder="email" className="input input-bordered" required />
                        </div>
                        {/* <div className="form-control">
                            <label className="label">
                                <span className="label-text">Subject</span>
                            </label>
                            <input type="subject" placeholder="subject" className="input input-bordered" required />
                        </div> */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Massage</span>
                            </label>
                            <textarea name="message" placeholder="massage" className="input input-bordered h-32" required></textarea>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn text-lg bg-prime text-white font-semibold hover:bg-white hover:text-prime" type="submit" value="Send" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;