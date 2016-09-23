import Handlebars from 'handlebars'

// Caching is deleted because it causes trouble when loading specific questions in already selected and rendered thread

function loadTemplate(templateName) {
    let templateUrl = `../templates/${templateName}.handlebars`;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: templateUrl,
            success: function (data) {
                let template = Handlebars.compile(data);
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