const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const Token = require("../utils/tokens");
//const sgMail = require("@sendgrid/mail");
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class User {
  static makePublicUser(user) {
    return {
      id: user.id,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      createdAt: user.createdat,

    };
  }

  static async login(credentials) {
    const requiredFields = ["email", "password"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    if (credentials.email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email.");
    }

    if (credentials.password.length < 1) {
      throw new BadRequestError("Please input password");
    }

    const user = await User.fetchUserByEmail(credentials.email);

    if (user) {
      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (isValid) {
        return user;
      }
    }

    throw new UnauthorizedError("Invalid email/password combo");
  }

  static async register(credentials) {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "password",
    
    ];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

   

    if (credentials.email.indexOf("@") <= 0 || credentials.email.length < 1) {
      throw new BadRequestError("Invalid email.");
    }

    if (credentials.password.length < 1) {
      throw new BadRequestError("Please input password");
    }

    if (credentials.firstName.length < 1) {
      throw new BadRequestError("Please input first name");
    }

    if (credentials.lastName.length < 1) {
      throw new BadRequestError("Please input last name");
    }

    const existingUser = await User.fetchUserByEmail(credentials.email);
    if (existingUser) {
      throw new BadRequestError(`Email already exists: ${credentials.email}`);
    }


    const hashedPassword = await bcrypt.hash(
      credentials.password,
      BCRYPT_WORK_FACTOR
    );

    const lowercasedEmail = credentials.email.toLowerCase();

    const result = await db.query(
      `
            INSERT INTO users(
                firstName,
                lastName,
                password,
                email
            )
            VALUES ($1,$2,$3,$4)
            RETURNING id,firstName,lastName,email;
            `,
      [
        credentials.firstName,
        credentials.lastName,
        hashedPassword,
        lowercasedEmail,
      ]
    );

    var user = result.rows[0];

    user = this.makePublicUser(user)
  
    return user;
  }

  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }

    if (email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email.");
    }

    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(query, [email.toLowerCase()]);
    var user = result.rows[0];

    

    
    return user;
  }

  static async fetchUserById(id) {
    if (!id) {
      throw new BadRequestError("No id provided");
    }

    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await db.query(query, [id]);
    var user = result.rows[0];

    user = this.makePublicUser(user)

    return user;
  }
}

module.exports = User;
