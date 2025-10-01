import { AtletaEntity } from "./atleta-entity";
import { AtleteModule } from "./atleta-module";
import { UserIdentityModel } from "../../lib/auth/local/user-identity.model";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { OptionalDTO, QueryAtletaDTO } from "./atleta-dto";
export class UserExistsError extends Error {
  constructor() {
    super();
    this.name = "UserExists";
    this.message = "Email già in uso";
  }
}

export class AtletaService {
  async addUser(
    user: AtletaEntity,
    credentials: { username: string; password: string }
  ): Promise<AtletaEntity> {
    const existing = await UserIdentityModel.findOne({
      "credentials.username": credentials.username,
    });
    if (existing) {
      throw new UserExistsError();
    }

    const newUser = await AtleteModule.create(user);
    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    await UserIdentityModel.create({
      provider: "local",
      user: newUser.id,
      credentials: {
        username: credentials.username,
        hashedPassword,
      },
    });

    return newUser;
  }

  async updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const identity = await UserIdentityModel.findOne({ user: userId });
    if (!identity) throw new Error("Utente non trovato");

    const match = await bcrypt.compare(oldPassword, identity.credentials.hashedPassword);
    if (!match) throw new Error("Vecchia password errata");

    identity.credentials.hashedPassword = await bcrypt.hash(newPassword, 10);
    await identity.save();
  }

  async updateUser(
    userId: string,
    updateData: Partial<AtletaEntity>,
    credentials?: { username?: string; password?: string }
  ): Promise<AtletaEntity | null> {
    const updatedUser = await AtleteModule.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updatedUser) throw new Error("Utente non trovato");

    if (credentials) {
      const identity = await UserIdentityModel.findOne({ user: userId });
      if (identity) {
        if (credentials.username) identity.credentials.username = credentials.username;
        if (credentials.password) {
          identity.credentials.hashedPassword = await bcrypt.hash(credentials.password, 10);
        }
        await identity.save();
      }
    }

    return updatedUser;
  }

  async deleteUser(userId: string): Promise<void> {
    await AtleteModule.findByIdAndDelete(userId);
    await UserIdentityModel.deleteOne({ user: userId });
  }

  async getEmail(userId: string): Promise<string | null> {
    const identity = await UserIdentityModel.findOne({ user: userId }).lean();
    return identity ? identity.credentials.username : null;
  }

   async sendMail(toEmail: string) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ric05bras@gmail.com",
        pass: "password_app_specifica", // sostituisci con la password dell'app
      },
    });

    const confermaLink = `http://localhost/conferma/${toEmail}`;

    const mailOptions = {
      from: "ric05bras@gmail.com",
      to: toEmail,
      subject: "Conferma la tua registrazione al profilo atleta",
      text: `Gentile Atleta,

Grazie per esserti registrato al nostro servizio.
Per completare la registrazione, ti chiediamo di confermare il tuo indirizzo email cliccando sul link sottostante:

${confermaLink}

Se non hai effettuato questa registrazione, ignora questa email.

Cordiali saluti,
Il Team Atleti`,
      html: `<h2>Conferma la tua registrazione al profilo atleta</h2>
<p>Gentile Atleta,</p>
<p>Grazie per esserti registrato al nostro servizio.</p>
<p>Per completare la registrazione, ti chiediamo di confermare il tuo indirizzo email cliccando sul pulsante sottostante:</p>
<p style="text-align:center;">
  <a href="${confermaLink}" style="display:inline-block; padding:10px 20px; color:#fff; background-color:#007bff; text-decoration:none; border-radius:5px;">Conferma Registrazione</a>
</p>
<p>Se non hai effettuato questa registrazione, puoi ignorare questa email.</p>
<p>Cordiali saluti,<br><strong>Il Team Atleti</strong></p>`,
    };

    await transporter.sendMail(mailOptions);
  }

  async confirmEmail(email: string) {
    // Verifica che esista un utente con quell'email
    const user = await UserIdentityModel.findOne({
      "credentials.username": email,
    });
    if (!user) {
      throw new Error("Email non trovata");
    }
    return { message: "Email confermata con successo" };
  }

    async find(query: Partial<QueryAtletaDTO>): Promise<AtletaEntity[]> {
    const q: any = {};
    if (query.name) q.name = { $regex: query.name, $options: "i" };
    if (query.lastname) q.lastname = { $regex: query.lastname, $options: "i" };
    if (query.rule) q.rule = { $regex: query.rule, $options: "i" };
    return await AtleteModule.find(q);
  }

  async findByID(id: string): Promise<AtletaEntity | null> {
    return AtleteModule.findById(id);
  }

  async add_Atlete(data: AtletaEntity): Promise<AtletaEntity> {
    return await AtleteModule.create(data);
  }

  async findByRuleOrAge(query: OptionalDTO): Promise<AtletaEntity[]> {
    const filter: any = {};
    if (query.age) filter.age = Number(query.age);
    if (query.rule) filter.rule = query.rule;

    if (Object.keys(filter).length === 0) return await AtleteModule.find();
    return await AtleteModule.find(filter);
  }
}

export default new AtletaService();
