import emailjs from "@emailjs/nodejs";
import { formatDateTime } from "../utils/dateUtils";

class EmailService {
  constructor() {
    emailjs.init({
      publicKey: process.env.EMAILJS_PUBLIC_KEY,
      privateKey: process.env.EMAILJS_PRIVATE_KEY,
    });

    this.serviceId = process.env.EMAILJS_SERVICE_ID;
    this.adminEmail = process.env.ADMIN_EMAIL;
  }

  async sendAdminNotification(type, data) {
    try {
      const templateParams = {
        type: type,
        name: data.name || data.username,
        email: data.email || "Not provided",
        company: data.company?.name || "Not provided",
        to_email: this.adminEmail,
        timestamp: formatDateTime(new Date().toISOString()),
      };

      await emailjs.send(
        this.serviceId,
        process.env.EMAILJS_NOTIFICATION_TEMPLATE,
        templateParams
      );

      console.log(`Admin notification sent for new ${type}`);
    } catch (error) {
      console.error(`Failed to send Admin notification:`, error.message);
    }
  }

  async sendClientWelcomeEmail(clientData, customMessage = null) {
    if (!clientData.email) {
      console.log("⚠️  No email provided for client welcome");
      return;
    }

    try {
      const templateParams = {
        client_name: clientData.username,
        client_email: clientData.email,
        company_name: clientData.company?.name || "your organization",
        login_url: process.env.CLIENT_LOGIN_URL || "https://yourapp.com/login",
        custom_message: customMessage || this.getDefaultWelcomeMessage(),
        timestamp: new Date().toLocaleString(),
      };

      await emailjs.send(
        this.serviceId,
        process.env.EMAILJS_WELCOME_TEMPLATE,
        templateParams
      );

      console.log("✅ Welcome email sent to client");
    } catch (error) {
      console.error("❌ Failed to send welcome email:", error.message);
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

module.exports = new EmailService();
