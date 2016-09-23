import Handlebars from 'handlebars'

const cache = {};

function loadTemplate(templateName) {
    let templateUrl = `../templates/${templateName}.handlebars`;
    return new Promise(function (resolve, reject) {

        // if (cache[templateName]) {
        //     resolve(cache[templateName])
        // }

        $.ajax({
            url: templateUrl,
            success: function (data) {
                let template = Handlebars.compile(data);
                // cache[templateName] = template;
                resolve(template);
            },
            error: function (err) {
                reject(err);
            }
        })
    });
}

class TemplateGenerator {
    load(templateName) {
        return loadTemplate(templateName);
    }
}

var templateGenerator = new TemplateGenerator();

export {templateGenerator};