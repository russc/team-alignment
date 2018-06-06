# PHP-CS-FIXER

GitHub: https://github.com/FriendsOfPHP/PHP-CS-Fixer
Rules: https://mlocati.github.io/php-cs-fixer-configurator/

# What does this do?

* Fixes your files when run to follow the rules outlined in the `.php_cs.dist` file

# How to use this file
* Place this file in your projects root folder
* If you don't use PHP Storm
    * You can either symlink the file to your project root and it will be automatically used whenever you run php-cs-fixer
    * Or you can include the path to it in the --config param on command line
* If you do use PHP Storm
    * Open Preferences
    * Go to Tools -> External tools and hit add
    * Name it something like PHP CS Fixer so you know what it is
    * In program add the path to your php-cs-fixer file
        * ex: `/Users/[SG#]/.composer/vendor/bin/php-cs-fixer`
    * In Arguments add `fix --config [projects path]/.php_cs.dist --verbose $FileDir$/$FileName$`
        * This will run php-cs-fixer on the current file
    * In Working Directory add `$ProjectFileDir$`
    * Save it then go to Preferences -> Keymap
    * Search for `External Tools` and find the tool you just added and set a key to run it
