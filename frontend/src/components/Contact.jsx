import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Your message has been sent. Thank you!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        toast.error('Failed to send email');
      }
    } catch (error) {
      toast.error('Error sending email');
      console.error('Error sending email:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">
          <div className="section-title" style={{ marginBottom: '4vh' }}>
            <h1><b>Contact Us</b></h1>
          </div>

          {/* <div>
            <iframe style={{ border: '0', width: '100%', height: '270px' }} title="Unique and Descriptive Title" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.7601694679583!2d80.06349527586782!3d9.701499090389209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe55a54a7a558f%3A0x67cb4958ab46df9d!2sKopay%20Christian%20College!5e0!3m2!1sen!2slk!4v1703174295583!5m2!1sen!2slk" frameBorder="0" allowFullScreen></iframe>
          </div> */}

          <div className="row mt-5">
            <div className="col-lg-4">
              <div className="info">
                <div className="address">
                  <i className="bi bi-geo-alt"></i>
                  <h4>Location:</h4>
                  <p>Luton,London</p>
                </div>

                <div className="email">
                  <i className="bi bi-envelope"></i>
                  <h4>Email:</h4>
                  <p>Officialrepairnow@gmail.com</p>
                </div>

                <div className="phone">
                  <i className="bi bi-phone"></i>
                  <h4>Call:</h4>
                  <p>+44123456789</p>
                </div>
              </div>
            </div>

            <div className="col-lg-8 mt-5 mt-lg-0">
              <form onSubmit={handleSubmit} className="php-email-form">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
                </div>
                <div className="form-group mt-3">
                  <textarea className="form-control" name="message" rows="5" placeholder="Message" value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <div className="my-3">
                  {submitting && <div className="loading">Loading</div>}
                </div>
                <div className="text-center"><button type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Send Message'}</button></div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
