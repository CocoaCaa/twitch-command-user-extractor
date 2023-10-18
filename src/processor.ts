export function setupProcessor(form: HTMLFormElement, resultElement: HTMLTextAreaElement) {
    function handleUploadedFileContent(params: { fileContent: string; command: string }) {
        const lines = params.fileContent.split(/\r?\n/);
        const names = lines
            .filter((it) => it.includes(`: ${params.command}`))
            .map((it) => /^\[\d{2}:\d{2}:\d{2}\]\s(.*):\s/.exec(it)?.[1])
            .filter(Boolean) as string[];
        resultElement.value = names.join('\n');
    }

    form.querySelector<HTMLInputElement>('[name="command"]')!.value = localStorage.getItem('defaultCommand') ?? '';

    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const formData = new FormData(form);
        const file = formData.get('file') as File;
        const command = formData.get('command') as string;
        localStorage.setItem('defaultCommand', command);

        const reader = new FileReader();
        reader.addEventListener('load', (ev) => {
            if (!ev.target?.result) {
                alert('Cannot read text file');
                return;
            }
            handleUploadedFileContent({ fileContent: ev.target.result as string, command });
        });
        reader.readAsText(file);
    });

    // fileElement.addEventListener('change', () => {
    //     if (!fileElement.files) {
    //         return;
    //     }
    //     const reader = new FileReader();

    //     reader.addEventListener('load', (ev) => {
    //         if (!ev.target?.result) {
    //             alert('Cannot read text file');
    //             return;
    //         }
    //         handleUploadedFileContent(ev.target.result as string);
    //     });
    //     reader.readAsText(fileElement.files[0]);
    //     fileElement.value = '';
    // });
}
