import { writeFile, access } from "fs/promises";
import { join } from "path";

const create = async () => {
  const filePath = join("src/fs/files", "fresh.txt");

  try {
    await access(filePath);
    throw new Error("FS operation failed");
  } catch (error) {
    if (error.message === "FS operation failed") {
      throw error;
    }
    await writeFile(filePath, "I am fresh and young", "utf8");
  }
};

await create();
