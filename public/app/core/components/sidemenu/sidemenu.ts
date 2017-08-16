///<reference path="../../../headers/common.d.ts" />

import config from 'app/core/config';
import _ from 'lodash';
import $ from 'jquery';
import coreModule from '../../core_module';

export class SideMenuCtrl {
  user: any;
  mainLinks: any;
  bottomNav: any;
  loginUrl: string;
  isSignedIn: boolean;

  /** @ngInject */
  constructor(private $scope, private $rootScope, private $location, private contextSrv, private backendSrv, private $element) {
    this.isSignedIn = contextSrv.isSignedIn;
    this.user = contextSrv.user;
    this.mainLinks = _.filter(config.bootData.navTree, item => !item.hideFromMenu);
    this.bottomNav = _.filter(config.bootData.navTree, item => item.hideFromMenu);
    this.loginUrl = 'login?redirect=' + encodeURIComponent(this.$location.path());

    if (contextSrv.user.orgCount > 1) {
      let profileNode = _.find(this.bottomNav, {id: 'profile'});
      if (profileNode) {
        profileNode.showOrgSwitcher = true;
      }
    }

    this.$scope.$on('$routeChangeSuccess', () => {
      if (!this.contextSrv.pinned) {
        this.contextSrv.sidemenu = false;
      }
      this.loginUrl = 'login?redirect=' + encodeURIComponent(this.$location.path());
    });
  }

  switchOrg() {
    this.$rootScope.appEvent('show-modal', {
      templateHtml: '<org-switcher dismiss="dismiss()"></org-switcher>',
    });
  }
}

export function sideMenuDirective() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/core/components/sidemenu/sidemenu.html',
    controller: SideMenuCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    scope: {},
    link: function(scope, elem) {
      // hack to hide dropdown menu
      elem.on('click.dropdown', '.dropdown-menu a', function(evt) {
        var menu = $(evt.target).parents('.dropdown-menu');
        var parent = menu.parent();
        menu.detach();

        setTimeout(function() {
          parent.append(menu);
        }, 100);
      });

      scope.$on("$destory", function() {
        elem.off('click.dropdown');
      });
    }
  };
}

coreModule.directive('sidemenu', sideMenuDirective);
