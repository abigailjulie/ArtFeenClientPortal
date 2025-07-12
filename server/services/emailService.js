import dotenv from "dotenv";
dotenv.config();
import emailjs from "@emailjs/nodejs";
import { formatDateTime } from "../utils/dateUtils.js";
import AIService from "./AIService.js";

export default class EmailService {
  constructor() {
    this.serviceId = process.env.EMAILJS_SERVICE_ID;
    this.adminEmail = process.env.ADMIN_EMAIL;
    this.publicKey = process.env.EMAILJS_PUBLIC_KEY;
    this.privateKey = process.env.EMAILJS_PRIVATE_KEY;

    this.aiService = new AIService();

    this.initializeEmailJS();
  }

  initializeEmailJS() {
    if (
      !this.serviceId ||
      !this.publicKey ||
      !this.privateKey ||
      !this.adminEmail
    ) {
      console.error("Missing required EmailJS environment variables");
      throw new Error("EmailJS configuration incomplete");
    }

    console.log("EmailJS service initialized");
  }

  async sendAdminNotification(type, data) {
    try {
      const templateParams = {
        type: type.charAt(0).toUpperCase() + type.slice(1),
        projectName: data.projectName || data.name || "Not provided",
        username: data.username || "Not provided",
        to_email: this.adminEmail,
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

      console.log(`Admin notification sent for new ${type}:`, {
        status: result.status,
      });
      return result;
    } catch (error) {
      console.error(`Failed to send Admin notification:`, {
        type,
        error: error.message,
        status: error.status,
        text: error.text,
      });

      return null;
    }
  }

  async sendClientWelcomeEmail(clientData, useAI = true) {
    if (!clientData.email) {
      console.log("No email provided for client welcome");
      return null;
    }

    try {
      let welcomeMessage;

      if (useAI) {
        console.log("Generating AI welcome message...");
        welcomeMessage = await this.aiService.generateWelcomeMessage(
          clientData
        );
      } else {
        welcomeMessage = this.aiService.getDefaultWelcomeMessage();
      }

      const templateParams = {
        client_name: clientData.username || "Valued Client",
        client_email: clientData.email,
        company_name:
          clientData.company?.name || clientData.company || "your organization",
        login_url: process.env.CLIENT_LOGIN_URL,
        custom_message:
          welcomeMessage || this.aiService.getDefaultWelcomeMessage(),
        timestamp: formatDateTime(new Date().toISOString()),
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

      console.log("AI-generated welcome email sent to client:", {
        email: clientData.email,
        status: result.status,
      });
      return result;
    } catch (error) {
      console.error("Failed to send welcome email:", {
        email: clientData.email,
        error: error.message,
        status: error.status,
        text: error.text,
      });

      return null;
    }
  }
}
