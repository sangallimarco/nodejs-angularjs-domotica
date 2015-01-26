angular.module('app.bootstrap')
.directive('formControl', function ($timeout) {
		return {
			restrict: 'AC',
			scope: {
				model: '=ngModel'
			},
			require: ['ngModel', '^formGroup'],
			link: function (scope, element, attrs, ctrls) {
				var ngModel = ctrls[0],
					timer = null,
					typingLimit = 1000,
					focusLimit = 2000,
					blurLimit = 500,
					input = element[0] 
					;

				ctrls[1].setField(ctrls[0], attrs.id);
				ngModel.$timedout = false;
				ngModel.$forceInvalid = false;

				/**
				 * Set value on autofill
				 */
				scope.$watch(
						function () {
							return element.val();
						}, 
						function(nv, ov) {
							if(nv !== ov && !ngModel.$viewValue) {
								ngModel.$setViewValue(nv);
							}
						}
					);

				/**
				 * https://github.com/calendee/val-on-timeout/blob/master/src/valOnTimeout.js
				 *
				 * Start timer for specified period.  If not cancelled before triggered, the 'timeout' property will
				 * be added to the field.
				 *
				 * @param timeLimit
				 */
				scope.startTimer = function (timeLimit) {
					timer = $timeout(function () {
						scope.$apply(function () {
							ngModel.$timedout = true;
						});
					}, timeLimit);
				};

				/**
				 * Cancel any existing timer.
				 */
				scope.cancelTimer = function () {
					$timeout.cancel(timer);
					ngModel.$timedout = false;
				};

				/**
				 * Will start a timer after each keypress to detect when typing stops
				 */
				element.bind('keydown', function () {

					if (timer) {
						scope.cancelTimer();
					}
					// Start the timer
					scope.startTimer(typingLimit);
				});

				/**
				 * Do not remove, this is an HACK to prevent input blurring while tapped , NgTouch bug
				 */
				element.bind('touchend', function (event) {
					event.stopPropagation();
				});
			}
		};
	});