require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");

const token = process.env.TOKEN;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

// 📌 โซน
const regions = {
  โซนเหนือ: [
    "🍡 зโซนเชียงราย®","🍡 зโซนเชียงใหม่®","🍡 зโซนแม่ฮ่องสอน®",
    "🍡 зโซนพะเยา®","🍡 зโซนน่าน®","🍡 зโซนแพร่®",
    "🍡 зโซนลำปาง®","🍡 зโซนลำพูน®","🍡 зโซนอุตรดิตถ์®",
  ],
  โซนอีสาน: [
    "🧩 зโซนบึงกาฬ®","🧩 зโซนหนองคาย®","🧩 зโซนเลย®","🧩 зโซนอุดรธานี®",
    "🧩 зโซนหนองบัวลำภู®","🧩 зโซนสกลนคร®","🧩 зโซนนครพนม®","🧩 зโซนมุกดาหาร®",
    "🧩 зโซนกาฬสินธุ์®","🧩 зโซนขอนแก่น®","🧩 зโซนร้อยเอ็ด®","🧩 зโซนมหาสารคาม®",
    "🧩 зโซนชัยภูมิ®","🧩 зโซนยโสธร®","🧩 зโซนอำนาจเจริญ®",
    "🧩 зโซนนครราชสีมา®","🧩 зโซนบุรีรัมย์®","🧩 зโซนสุรินทร์®",
    "🧩 зโซนศรีสะเกษ®","🧩 зโซนอุบลราชธานี®",
  ],
  โซนกลาง: [
    "🔥 зโซนกรุงเทพมหานคร®","🔥 зโซนนครสวรรค์®","🔥 зโซนสุโขทัย®",
    "🔥 зโซนลพบุรี®","🔥 зโซนสิงห์บุรี®","🔥 зโซนอ่างทอง®",
    "🔥 зโซนสระบุรี®","🔥 зโซนพระนครศรีอยุธยา®","🔥 зโซนสุพรรณบุรี®",
    "🔥 зโซนปทุมธานี®","🔥 зโซนนนทบุรี®","🔥 зโซนนครปฐม®",
    "🔥 зโซนสมุทรปราการ®","🔥 зโซนสมุทรสงคราม®","🔥 зโซนสมุทรสาคร®",
    "🔥 зโซนชัยนาท®","🔥 зโซนกำแพงเพชร®","🔥 зโซนนครนายก®",
    "🔥 зโซนพิจิตร®","🔥 зโซนพิษณุโลก®","🔥 зโซนเพชรบูรณ์®",
    "🔥 зโซนอุทัยธานี®",
  ],
  โซนตะวันออก: [
    "🏹 зโซนฉะเชิงเทรา®","🏹 зโซนตราด®","🏹 зโซนสระแก้ว®",
    "🏹 зโซนปราจีนบุรี®","🏹 зโซนจันทบุรี®","🏹 зโซนชลบุรี®","🏹 зโซนระยอง®",
  ],
  โซนตะวันตก: [
    "🪸 зโซนตาก®","🪸 зโซนกาญจนบุรี®","🪸 зโซนเพชรบุรี®",
    "🪸 зโซนราชบุรี®","🪸 зโซนประจวบคีรีขันธ์®",
  ],
  โซนใต้: [
    "🌊 зโซนชุมพร®","🌊 зโซนระนอง®","🌊 зโซนสุราษฎร์ธานี®",
    "🌊 зโซนพังงา®","🌊 зโซนกระบี่®","🌊 зโซนนครศรีธรรมราช®",
    "🌊 зโซนภูเก็ต®","🌊 зโซนตรัง®","🌊 зโซนพัทลุง®",
    "🌊 зโซนสงขลา®","🌊 зโซนสตูล®","🌊 зโซนปัตตานี®",
    "🌊 зโซนยะลา®","🌊 зโซนนราธิวาส®",
  ],
};

const allProvinces = Object.values(regions).flat();

function normalize(t) {
  return t.replace(/[^ก-๙a-zA-Z0-9]/g, "").toLowerCase();
}

function regionMenu() {
  return new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("region")
      .setPlaceholder("🌕 เลือกโซนของคุณ")
      .addOptions([
        { label: "โซนเหนือ", value: "โซนเหนือ", emoji: "🍡" },
        { label: "โซนอีสาน", value: "โซนอีสาน", emoji: "🧩" },
        { label: "โซนกลาง", value: "โซนกลาง", emoji: "🔥" },
        { label: "โซนตะวันออก", value: "โซนตะวันออก", emoji: "🏹" },
        { label: "โซนตะวันตก", value: "โซนตะวันตก", emoji: "🪸" },
        { label: "โซนใต้", value: "โซนใต้", emoji: "🌊" },
      ])
  );
}

function provinceMenu(region) {
  return new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("province")
      .setPlaceholder("📍 เลือกโซนของคุณ")
      .addOptions(
        regions[region].map((p) => ({
          label: p,
          value: p,
        }))
      )
  );
}

function resetBtn() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("reset")
      .setLabel("🔄 รีเซ็ต")
      .setStyle(ButtonStyle.Danger)
  );
}

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {

  if (interaction.isChatInputCommand() && interaction.commandName === "start") {

    await interaction.deferReply({ ephemeral: true });

    const embed = new EmbedBuilder()
      .setTitle("📢 ระบบเลือกโซนอัตโนมัติ")
      .setDescription("รับยศโซน เพื่อเข้าห้อง\nเลือกโซน | เลือกรับยศโซนของคุณ")
      .setImage("https://i.ibb.co/mCKGhcHd/image.png")
      .setColor(0x2b2dff);

    await interaction.channel.send({
      embeds: [embed],
      components: [regionMenu(), resetBtn()],
    });

    return interaction.deleteReply();
  }

  if (interaction.isStringSelectMenu() && interaction.customId === "region") {
    const region = interaction.values[0];

    return interaction.reply({
      content: `📌 ${region}\n📍 เลือกโซน`,
      components: [provinceMenu(region), resetBtn()],
      ephemeral: true,
    });
  }

  if (interaction.isStringSelectMenu() && interaction.customId === "province") {
    const province = interaction.values[0];

    try {
      const member = interaction.member;

      const role = interaction.guild.roles.cache.find(
        (r) => normalize(r.name) === normalize(province)
      );

      if (!role) {
        return interaction.reply({
          content: `❌ ไม่พบ role: ${province}`,
          ephemeral: true,
        });
      }

      const rolesToRemove = member.roles.cache.filter((r) =>
        allProvinces.some((p) => normalize(p) === normalize(r.name))
      );

      if (rolesToRemove.size) {
        await member.roles.remove(rolesToRemove);
      }

      await member.roles.add(role);

      return interaction.reply({
        content: `✅ ได้รับยศ ${province}`,
        ephemeral: true,
      });

    } catch (err) {
      console.error(err);
      return interaction.reply({
        content: "❌ Error (เช็ค Role Bot)",
        ephemeral: true,
      });
    }
  }

  if (interaction.isButton() && interaction.customId === "reset") {
    try {
      const member = interaction.member;

      const rolesToRemove = member.roles.cache.filter((r) =>
        allProvinces.some((p) => normalize(p) === normalize(r.name))
      );

      if (!rolesToRemove.size) {
        return interaction.reply({
          content: "ยังไม่มียศ",
          ephemeral: true,
        });
      }

      await member.roles.remove(rolesToRemove);

      return interaction.reply({
        content: "🔄 รีเซ็ตแล้ว",
        ephemeral: true,
      });

    } catch (err) {
      console.error(err);
      return interaction.reply({
        content: "❌ รีเซ็ตไม่ได้",
        ephemeral: true,
      });
    }
  }
});

client.login(token);