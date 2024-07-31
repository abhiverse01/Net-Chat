<!-- README.md -->

<h1 align="center">🚀 NetMag: The Ultimate Network Chat Application</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Kafka-2.8.0-brightgreen" alt="Kafka">
  <img src="https://img.shields.io/badge/WebSocket-Node.js-blue" alt="WebSocket">
  <img src="https://img.shields.io/badge/JavaScript-ES6-yellow" alt="JavaScript">
  <img src="https://img.shields.io/badge/License-MIT-blue" alt="License">
</p>

<p align="center">
  <img src="\assets\netmag.png" alt="NetMag Logo" width="400">
</p>

<p align="center">
  <b>NetMag</b> is a blazing fast, real-time network chat application powered by Apache Kafka and WebSockets. 
  Connect with anyone on the same network instantly and seamlessly. Experience the magic of network communication with <i>NetMag</i>! 
</p>

---

<h2>✨ Features</h2>

<ul>
  <li>🔥 <strong>Real-Time Messaging:</strong> Instantly send and receive messages within the same network.</li>
  <li>🔗 <strong>Kafka Powered:</strong> Robust messaging backbone using Apache Kafka for reliable message delivery.</li>
  <li>💻 <strong>WebSocket Communication:</strong> Lightweight and efficient real-time communication using WebSockets.</li>
  <li>🌐 <strong>Cross-Browser Compatibility:</strong> Works on any modern browser, ensuring everyone stays connected.</li>
  <li>⚡ <strong>Simple and Elegant UI:</strong> Clean and intuitive user interface for effortless chatting.</li>
</ul>

---

<h2>🚀 Getting Started</h2>

<h3>1. Clone the Repository</h3>
<p>To clone the repository, use the following command:</p>
<p><code>git clone https://github.com/yourusername/netmag.git</code></p>
<p>Navigate into the project directory:</p>
<p><code>cd netmag</code></p>

<h3>2. Install Dependencies</h3>
<p>To install the necessary dependencies, run:</p>
<p><code>npm install</code></p>

<h3>3. Start the Kafka and Zookeeper Servers</h3>
<p>To start Zookeeper, use the following command:</p>
<p><code>zookeeper-server-start.sh config/zookeeper.properties</code></p>
<p>Next, start the Kafka broker:</p>
<p><code>kafka-server-start.sh config/server.properties</code></p>

<h3>4. Run the WebSocket Server</h3>
<p>Start the WebSocket server with the following command:</p>
<p><code>node server.js</code></p>

<h3>5. Open the Chat Interface</h3>
<p>To serve the chat interface, you can use a simple HTTP server:</p>
<p><code>http-server</code></p>
<p>Open your browser and navigate to <a href="http://localhost:8080" target="_blank">http://localhost:8080</a></p>

---

<h2>🛠️ Configuration</h2>

<p>
  You can customize the application by modifying the configuration in <code>server.js</code> and <code>index.html</code>.
  Feel free to change the WebSocket port, Kafka topics, or even the UI to match your needs.
</p>

---

<h2>🤝 Contributing</h2>

<p>
  Contributions are what make the open-source community such an amazing place to learn, inspire, and create. 
  Any contributions you make are <strong>greatly appreciated</strong>.
</p>

<h3>1. Fork the Project</h3>
<p>To fork the project, go to:</p>
<p><code>https://github.com/yourusername/netmag/fork</code></p>

<h3>2. Create Your Feature Branch</h3>
<p>Create a new branch for your feature:</p>
<p><code>git checkout -b feature/AmazingFeature</code></p>

<h3>3. Commit Your Changes</h3>
<p>Commit your changes with a meaningful message:</p>
<p><code>git commit -m 'Add some AmazingFeature'</code></p>

<h3>4. Push to the Branch</h3>
<p>Push your branch to GitHub:</p>
<p><code>git push origin feature/AmazingFeature</code></p>

<h3>5. Open a Pull Request</h3>
<p>Finally, open a Pull Request to the main branch of the repository.</p>

---

<h2>📝 License</h2>

<p>
  Distributed under the MIT License. See <a href="LICENSE">LICENSE</a> for more information.
</p>

---

<h2>💬 Contact</h2>

<p>
  Your Name - <a href="mailto:youremail@example.com">youremail@example.com</a>
</p>

<p align="center">
  <a href="https://github.com/yourusername/netmag" target="_blank">View Project on GitHub</a>
</p>
