
const Contact = () => {
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
                    <form className="card-body border-2 rounded-lg border-prime ">
                        <h1 className="text-3xl font-bold text-center">Get In Touch</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Subject</span>
                            </label>
                            <input type="subject" placeholder="subject" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Massage</span>
                            </label>
                            <textarea placeholder="massage" className="input input-bordered h-32" required></textarea>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn text-lg bg-prime text-white font-semibold hover:bg-white hover:text-prime">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;