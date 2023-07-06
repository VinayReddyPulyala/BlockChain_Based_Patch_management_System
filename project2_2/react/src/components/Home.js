import React from 'react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero bg-primary text-white text-center py-5">
        <div className="container">
          <h1>Welcome to Our Website</h1>
          <p className="lead">Discover amazing products and services that will change your life.</p>
          <button className="btn btn-light btn-lg">Get Started</button>
        </div>
      </section>

      {/* Feature Section */}
      <section className="features py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h2>Feature 1</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="col-md-4">
              <h2>Feature 2</h2>
              <p>Aliquam erat volutpat. Quisque ac est nec odio hendrerit varius.</p>
            </div>
            <div className="col-md-4">
              <h2>Feature 3</h2>
              <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper."</p>
              <p>- John Doe</p>
            </div>
            <div className="col-md-6">
              <p>"Aliquam erat volutpat. Quisque ac est nec odio hendrerit varius."</p>
              <p>- Jane Smith</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta bg-primary text-white text-center py-5">
        <div className="container">
          <h2>Start your journey today!</h2>
          <button className="btn btn-light btn-lg">Sign Up Now</button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us py-5">
        <div className="container">
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique, mauris sed fermentum ultricies, dui odio feugiat enim, sit amet sodales lacus ligula id urna.</p>
        </div>
      </section>

      {/* Featured Products/Services Section */}
      <section className="featured-products py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h3>Product 1</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="col-md-4">
              <h3>Product 2</h3>
              <p>Aliquam erat volutpat. Quisque ac est nec odio hendrerit varius.</p>
            </div>
            <div className="col-md-4">
              <h3>Product 3</h3>
              <p>Etiam nec diam leo. Proin eget arcu ac sapien vehicula placerat sed id metus.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact bg-light py-5">
        <div className="container">
          <h2>Contact Us</h2>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea className="form-control" rows="5"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
