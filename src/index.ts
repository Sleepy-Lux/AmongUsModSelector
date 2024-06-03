import { execSync } from 'child_process';
import { Instance } from 'chalk'; 
import * as readline from 'readline';
import * as path from 'path';
import * as fs from 'fs';

const chalk = new Instance();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
async function Prompt(msg: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(msg, (answer) => {
            rl.close();
            resolve(answer.toString().trim());
        });
    });
};

function Recursive_Copy(source: string, dest: string) {
    const source_files = fs.readdirSync(source);
    for (const file_name of source_files) {
        const file = path.join(source, file_name);
        if (fs.lstatSync(file).isFile())
            fs.copyFileSync(file, path.join(dest, file_name));
        else {
            try  {
                fs.mkdirSync(path.join(dest, file_name));
            } catch {};
            Recursive_Copy(file, path.join(dest, file_name));
        };
    };
};

function Recursive_Search(folder: string) {
    const return_array: string[] = [];
    try {
        fs.readdirSync(path.join(__dirname, folder)).forEach((sub_folder) => {
            const current_folder = path.join(__dirname, folder, sub_folder);
            if (fs.lstatSync(current_folder).isDirectory())
                Recursive_Search(current_folder);
            return_array.push(current_folder);
        });
    } catch {}

    return return_array;
};
const versions = Recursive_Search("Versions");

(async() => {
    while (true) {
        const accepted_versions: {[x: string]: string} = {};
        console.clear()
        console.log(chalk.magenta(" █████╗ ██╗   ██╗              ███╗   ███╗███████╗"));
        console.log(chalk.magenta("██╔══██╗██║   ██║              ████╗ ████║██╔════╝"));
        console.log(chalk.magenta("███████║██║   ██║    █████╗    ██╔████╔██║███████╗"));
        console.log(chalk.magenta("██╔══██║██║   ██║    ╚════╝    ██║╚██╔╝██║╚════██║"));
        console.log(chalk.magenta("██║  ██║╚██████╔╝              ██║ ╚═╝ ██║███████║"));
        console.log(chalk.magenta("╚═╝  ╚═╝ ╚═════╝               ╚═╝     ╚═╝╚══════╝"));
        console.log("");
        if (versions?.length == 0) console.log(chalk.red(`0. No Versions Found
Make sure the 'Versions' folder is next to the .exe file
Make sure the among us install folders are in the 'Versions' folder
Make sure the among us exe is named "Among Us.exe"`));
        else versions?.forEach((v, i) => {
            console.log(chalk.greenBright(i+1 + ": " + v.split(/\/|\\/g)[v.split(/\/|\\/g).length-1]));
            accepted_versions[i+1] = v;
        });
        console.log("");
        try {
            const input: string = await Prompt(chalk.blueBright("Please Select a Version to Play: "));

            const version = accepted_versions[parseInt(input)];
            if (!version) continue;

            console.log(chalk.greenBright("Launching " + version.split(/\/|\\/g)[version.split(/\/|\\/g).length-1] + "..."));
            
            const amongus_path = path.join("..", "Among Us");
            const files = fs.readdirSync(amongus_path);
            for (const file of files)
                if (!file.toLowerCase().includes("data") || file.toLowerCase().includes("config")) {
                    console.log(file);
                    fs.rmSync(path.join(amongus_path, file), { recursive: true, force: true });
                }
            console.log(chalk.gray("Deleting Old AmongUs Version Files..."));

            await Recursive_Copy(version, amongus_path);
            console.log(chalk.gray("Copying New AmongUs Version Files..."));

            execSync('start steam://rungameid/945360')
            console.log(chalk.gray("Launching AmongUs..."));

            return;
        } catch(err) {
            throw err;
        }
    };
})();