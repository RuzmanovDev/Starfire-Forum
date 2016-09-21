import Handlebars from 'handlebars'

function loadTemplate(templateName) {
    let templateUrl = `../templates/${templateName}.handlebars`;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: templateUrl,
            success: function (data) {
                resolve(Handlebars.compile(data));
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