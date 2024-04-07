import {ID} from '../config';
import {localize} from '../helpers/i18n';

export default async function selectArmorRollType(item) {
    return new Promise(async (resolve, reject) => {
        const data = item.system;

        const template = await renderTemplate(
            `systems/${ID}/templates/dialogs/roll_armor.hbs`,
            data,
        );
        const buttons = {
            cancel: {
                label: localize('cancel'),
            },
        };
        let dialog;
        const render = (html) => {
            html.find('.attribute-selector-attr').on('click', (e) => {
                const attr = e.currentTarget.dataset.type;
                resolve(attr);
                dialog.close();
            });
        };
        dialog = new Dialog(
            {
                title: localize('rolls.dialog.select_armor_roll_type.title'),
                content: template,
                buttons: buttons,
                default: 'cancel',
                render,
                close: reject,
            },
            {
                classes: ['coriolis-roll-dialog', 'coriolis-window'],
            },
        );
        dialog.render(true);
    });
}
