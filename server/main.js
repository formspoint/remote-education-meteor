import { Accounts } from 'meteor/accounts-base';
import { Groups, Courses, Lectures, Files} from '../lib/collections';

Meteor.startup(() => {
    console.log('goooo2');
  // code to run on server at startup
});

Meteor.methods({
    updateUser: function (data) {
        return Meteor.users.update({_id: data.id}, {$set: {
            username: data.username,
            'profile.name': data.profile.name,
            'profile.birthday': data.profile.birthday,
            'profile.groupId': data.profile.groupId,
            'emails[0].address': data.email
        }});
    },
    createUserAccount: function (data) {
        return Accounts.createUser(data);
    },
    removeUser: function (id) {
        return Meteor.users.remove({_id: id});
    },
    setUserRole: function (data) {
        return Meteor.users.update({_id: data.id}, {$set: {
            roles: data.roles
        }});
    },
    createGroup: function (data) {
        return Groups.insert(data);
    },
    updateGroup: function (data) {
        return Groups.update({_id: data.id}, {$set: {
            name: data.name
        }});
    },
    removeGroup: function (id) {
        return Groups.remove({_id: id});
    },
    createCourse: function (data) {
        return Courses.insert(data);
    },
    updateCourse: function (data) {
        return Courses.update({_id: data.id}, {$set: {
            name: data.name,
            group: data.group,
            teachers: data.teachers,
            start: data.start,
            end: data.end
        }});
    },
    addFileToCourse: function (data) {
        return Courses.update({_id: data.id}, {$push: {
            files: data.fileId
        }});
    },
    addFileToLecture: function (data) {
        return Lectures.update({_id: data.id}, {$push: {
            files: data.fileId
        }});
    },
    removeFileFromCourse: function (data) {
        Courses.update({_id: data.id}, {$pull: {files: data.fileId}});
        return Files.remove({_id: data.fileId});
    },
    removeFileFromLecture: function (data) {
        Lectures.update({_id: data.id}, {$pull: {files: data.fileId}});
        return Files.remove({_id: data.fileId});
    },
    updateCourseInfo: function (data) {
        return Courses.update({_id: data.id}, {$set: {
            description: data.description
        }});
    },
    removeCourse: function (id) {
        return Courses.remove({_id: id});
    },
    createLecture: function (data) {
        return Lectures.insert(data);
    },
    updateLecture: function (data) {
        return Lectures.update({_id: data.id}, {$set: {
            name: data.name,
            description: data.description
        }});
    },
    removeLecture: function (id) {
        return Lectures.remove({_id: id});
    }
});
