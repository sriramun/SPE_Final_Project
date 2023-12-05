import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h2>Dashboard</h2>
      <p>Welcome to Astro Help-Desk – your one-stop solution for seamless ticket management and efficient issue resolution! 
        Our user-friendly platform allows you to effortlessly raise and track tickets, ensuring that your concerns are addressed 
        promptly. Stay in the loop with the latest company updates through our dedicated section, keeping you informed and connected.
        Astro Help-Desk is committed to providing a streamlined experience, empowering you to navigate through your support needs with
        ease. Join us on the journey of efficient ticket resolution and stay informed with the latest developments – because at Astro 
        Help-Desk, we prioritize your satisfaction and keep you at the heart of our service! </p>

      <div className="flex justify-center my-8">
        <Link href="/tickets">
          <button className="btn-primary">View Tickets</button>
        </Link>
      </div>

      <h2>Company Updates</h2>
      <div className="card">
        <h3>New member of the web dev team...</h3>
        <p>Thrilled to announce a talented addition to our team! 🌟 Welcome Monocarp, our newest web developer at Astro Help-Desk. 
          Ready to bring innovation and expertise to elevate your online experience. 🖥️ #TeamExpansion </p>
      </div>
      <div className="card">
        <h3>New website live!</h3>
        <p>Exciting news! 🚀 Astro Help-Desk unveils a sleek new user interface on the frontend, enhancing your ticket management 
          experience. Enjoy a modern design and improved navigation for seamless interaction</p>
      </div>
    </main>
  )
}
