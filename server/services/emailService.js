import dotenv from "dotenv";
dotenv.config();
import emailjs from "@emailjs/nodejs";
import { formatDateTime } from "../utils/dateUtils.js";

export default class EmailService {
  constructor() {
    this.serviceId = process.env.EMAILJS_SERVICE_ID;
    this.adminEmail = process.env.ADMIN_EMAIL;
    this.publicKey = process.env.EMAILJS_PUBLIC_KEY;
    this.privateKey = process.env.EMAILJS_PRIVATE_KEY;

    this.initializeEmailJS();
  }

  initializeEmailJS() {
    if (!this.serviceId || !this.publicKey || !this.privateKey) {
      console.log(
        "ENV vars:",
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_PUBLIC_KEY,
        process.env.EMAILJS_PRIVATE_KEY
      );
      console.error("❌ Missing required EmailJS environment variables");
      throw new Error("EmailJS configuration incomplete");
    }

    console.log("✅ EmailJS service initialized");
  }

  async sendAdminNotification(type, data) {
    try {
      const templateParams = {
        type: type.charAt(0).toUpperCase() + type.slice(1),
        projectName: data.projectName || data.name || "Not provided",
        username: data.username || "Not provided",
        to_email: this.adminEmail || "Not provided",
        timestamp: formatDateTime(new Date().toISOString()) || "Not provided",
      };

      const result = await emailjs.send(
        this.serviceId,
        process.env.EMAILJS_NOTIFICATION_TEMPLATE,
        templateParams,
        {
          publicKey: this.publicKey,
          privateKey: this.privateKey,
        }
      );

      console.log(`✅ Admin notification sent for new ${type}:`, {
        status: result.status,
        text: result.text,
      });
      return result;
    } catch (error) {
      console.error(`❌ Failed to send Admin notification:`, {
        error: error.message,
        status: error.status,
        text: error.text,
      });

      return null;
    }
  }

  async sendClientWelcomeEmail(clientData, customMessage = null) {
    if (!clientData.email) {
      console.log("⚠️  No email provided for client welcome");
      return null;
    }

    try {
      const templateParams = {
        client_name: clientData.username,
        client_email: clientData.email,
        company_name:
          clientData.company?.name || clientData.company || "your organization",
        login_url: process.env.CLIENT_LOGIN_URL,
        custom_message: customMessage || this.getDefaultWelcomeMessage(),
        timestamp: new Date().toLocaleString(),
      };

      const result = await emailjs.send(
        this.serviceId,
        process.env.EMAILJS_WELCOME_TEMPLATE,
        templateParams,
        {
          publicKey: this.publicKey,
          privateKey: this.privateKey,
        }
      );

      console.log("✅ Welcome email sent to client:", {
        email: clientData.email,
        status: result.status,
        text: result.text,
      });
      return result;
    } catch (error) {
      console.error("❌ Failed to send welcome email:", {
        email: clientData.email,
        error: error.message,
        status: error.status,
        text: error.text,
      });

      return null;
    }
  }

  getDefaultWelcomeMessage() {
    return `Welcome to our platform! Your account has been successfully created and you can now access all our services. If you have any questions, our support team is here to help.`;
  }

  // Future: AI-generated welcome message
  async generateWelcomeMessage(clientData) {
    // This is where you'd integrate with Hugging Face later
    // For now, return default message
    return this.getDefaultWelcomeMessage();
  }
}
